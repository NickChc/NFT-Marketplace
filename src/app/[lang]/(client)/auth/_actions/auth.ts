import { TLocale, i18n } from "../../../../../../i18n.config";
import { z } from "zod";
import en from "@/dictionaries/en.json";
import ka from "@/dictionaries/ka.json";
import { auth, usersCollectionRef } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { TUser } from "@/@types/general";

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
  redirect: (path: string) => void,
  prevState: unknown,
  formData: FormData
) {
  const result = loginSchema.safeParse(Object.fromEntries(formData.entries()));

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  try {
    await signInWithEmailAndPassword(auth, data.email, data.password);

    const pathname = window.location.pathname;
    const segments = pathname.split("/");

    const locale: TLocale = i18n.locales.find((loc) => segments.includes(loc))!;

    redirect(`/${locale}`);
  } catch (error: any) {
    if (error.message.includes("invalid-credential")) {
      const translations = getTranslations();

      return { auth: [translations.invalidCredentials] };
    }

    return { auth: "Problem occured trying to log in" };
  }
}

export async function register(
  redirect: (path: string) => void,
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

  const newUser: Omit<TUser, "id"> = {
    name: data.name,
    surname: data.surname,
    email: data.email,
    isFrozen: false,
    spentInCents: 0,
    ownings: [],
  };

  await Promise.all([
    createUserWithEmailAndPassword(auth, data.email, data.password),
    addDoc(usersCollectionRef, newUser),
  ]);

  const pathname = window.location.pathname;
  const segments = pathname.split("/");

  const locale: TLocale = i18n.locales.find((loc) => segments.includes(loc))!;

  redirect(`/${locale}`);
}
