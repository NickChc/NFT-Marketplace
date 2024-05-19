"use server";

import { TLocale, i18n } from "../../../../../../i18n.config";
import { headers } from "next/headers";
import { z } from "zod";
import en from "@/dictionaries/en.json";
import ka from "@/dictionaries/ka.json";
import { auth, usersCollectionRef } from "@/firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { addDoc } from "firebase/firestore";
import { TUser } from "@/@types/general";

function getTranslations() {
  const headerList = headers();
  const pathname = headerList.get("referer") || "";
  const segments = pathname.split("/");

  const locale: TLocale = i18n.locales.find((loc) => segments.includes(loc))!;

  if (locale === "en") {
    return en.page.registerValidation;
  } else if (locale === "ka") {
    return ka.page.registerValidation;
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
      email: z.string().email(),
      password: passwordSchema,
      repeatPassword: z.string(),
    })
    .refine((data) => data.password === data.repeatPassword, {
      message: translations.passwordsMatch,
      path: ["repeatPassword"],
    });
}

export async function register(prevState: unknown, formData: FormData) {
  const registerSchema = createRegisterSchema();
  const result = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;
  console.log(data);

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
  

}
