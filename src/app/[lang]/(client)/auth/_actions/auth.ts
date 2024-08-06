import { TLocale, i18n } from "../../../../../../i18n.config";
import { z } from "zod";
import en from "@/dictionaries/en.json";
import ka from "@/dictionaries/ka.json";
import { auth, googleProvider } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { TUser } from "@/@types/general";
import { createUser } from "@/app/[lang]/_api/createUser";
import { getUser } from "@/app/[lang]/_api/getUser";
import { updateNameOnProducts } from "../../_actions/user";

function getTranslations() {
  const pathname = window.location.pathname;
  const segments = pathname.split("/");

  const locale: TLocale = i18n.locales.find((loc) => segments.includes(loc))!;

  if (locale === "en") {
    return en.page.authValidation;
  } else if (locale === "ka") {
    return ka.page.authValidation;
  } else {
    throw new Error("Unsopported locale");
  }
}

function createPasswordSchema() {
  const selectedMessages = getTranslations();

  const minLength = z
    .string()
    .min(8, { message: selectedMessages.passwordTooShort });
  const maxLength = z
    .string()
    .max(50, { message: selectedMessages.passwordTooLong });
  const lowercase = z.string().regex(/(?=.*[a-z])/, {
    message: selectedMessages.passwordLowercase,
  });
  const uppercase = z.string().regex(/(?=.*[A-Z])/, {
    message: selectedMessages.passwordUppercase,
  });
  const digit = z
    .string()
    .regex(/(?=.*\d)/, { message: selectedMessages.passwordDigit });
  const specialChar = z.string().regex(/(?=.*[@$!%*?&amp;])/, {
    message: selectedMessages.passwordSymbol,
  });

  const passwordSchema = z.string().superRefine((val, ctx) => {
    const minLengthResult = minLength.safeParse(val);
    const maxLengthResult = maxLength.safeParse(val);
    const lowercaseResult = lowercase.safeParse(val);
    const uppercaseResult = uppercase.safeParse(val);
    const digitResult = digit.safeParse(val);
    const specialCharResult = specialChar.safeParse(val);

    if (!minLengthResult.success) {
      ctx.addIssue(minLengthResult.error?.errors[0] || []);
    } else if (!maxLengthResult.success) {
      ctx.addIssue(maxLengthResult.error?.errors[0] || []);
    } else if (!lowercaseResult.success) {
      ctx.addIssue(lowercaseResult.error?.errors[0] || []);
    } else if (!uppercaseResult.success) {
      ctx.addIssue(uppercaseResult.error?.errors[0] || []);
    } else if (!digitResult.success) {
      ctx.addIssue(digitResult.error?.errors[0] || []);
    } else if (!specialCharResult.success) {
      ctx.addIssue(specialCharResult.error?.errors[0] || []);
    }
  });

  return passwordSchema;
}

function createRegisterSchema() {
  const passwordSchema = createPasswordSchema();
  const translations = getTranslations();

  return z
    .object({
      name: z.string().trim().min(1, { message: translations.emptyField }),
      surname: z.string().trim().min(1, { message: translations.emptyField }),
      email: z
        .string()
        .email()
        .refine((email) => email === email.toLowerCase(), {
          message: translations.lowerCaseEmail,
        }),
      password: passwordSchema,
      repeatPassword: z.string(),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: translations.passwordsMatch,
      path: ["repeatPassword"],
    });
}

function createLoginSchema() {
  const translations = getTranslations();

  return z.object({
    email: z.string().trim().min(1, { message: translations.emptyField }),
    password: z.string().min(1, { message: translations.emptyField }),
  });
}

const loginSchema = createLoginSchema();

export async function login(
  redirect: () => void,
  prevState: unknown,
  formData: FormData
) {
  const translations = getTranslations();

  const result = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);

    redirect();
  } catch (error: any) {
    if (error.message.includes("invalid-credential")) {
      return { auth: [translations.invalidCredentials] };
    }

    return { auth: [translations.loginProblem] };
  }
}

export async function register(
  redirect: (path: string) => void,
  verificationStatusChange: () => void,
  setVerificationError: React.Dispatch<React.SetStateAction<string>>,
  setSecondAcc: () => void,
  prevState: unknown,
  formData: FormData
) {
  const registerSchema = createRegisterSchema();
  const result = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  let userUID;

  try {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const user = userCredentials.user;

    if (user == null) return;

    userUID = user.uid;

    const newUser: Omit<TUser, "id"> = {
      uid: userUID,
      name: data.name,
      surname: data.surname,
      email: data.email,
      isFrozen: false,
      spentInCents: 0,
      ownings: [],
      offers: [],
    };
    await Promise.all([createUser(newUser), sendEmailVerification(user)]);
    verificationStatusChange();
  } catch (error: any) {
    console.log(error.message);
    if (error.message.includes("email-already-in-use")) {
      const user = await getUser(data.email);
      if (user == null) return;
      userUID = user.uid;

      const newUser: Omit<TUser, "uid"> = {
        id: user.id,
        name: data.name,
        surname: data.surname,
        email: data.email,
        isFrozen: false,
        spentInCents: 0,
        ownings: [],
        offers: [],
      };
      const result = await handleExistingAccount(
        data,
        newUser,
        verificationStatusChange
      );
      setSecondAcc();
      const translations = getTranslations();
      if (result) return;
      setVerificationError(translations.emailAlreadyUsed);
    }
  }
}

interface TData {
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
}

async function handleExistingAccount(
  data: TData,
  newUser: Omit<TUser, "uid">,
  verificationStatusChange: () => void
) {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    await deleteUser(result.user);
    await signOut(auth);
    if (result.user.email === data.email) {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredentials.user;
      await Promise.all([
        createUser({ ...newUser, uid: user.uid }),
        sendEmailVerification(user),
        updateNameOnProducts(`${newUser.name} ${newUser.surname}`, newUser.id),
      ]);
      verificationStatusChange();
      return true;
    }
    return false;
  } catch (error: any) {
    console.log(error.message);
  }
}
