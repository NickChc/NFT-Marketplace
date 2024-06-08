import { TLocale, i18n } from "../../../../../i18n.config";
import { z } from "zod";
import en from "@/dictionaries/en.json";
import ka from "@/dictionaries/ka.json";
import { getUser } from "@/app/[lang]/_api/getUser";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { User, updateEmail } from "firebase/auth";

const updateValuesSchema = z.object({
  name: z.string().min(1),
  surname: z.string().min(1),
  email: z
    .string()
    .email()
    .refine((email) => email === email.toLowerCase(), {
      message: "lowercase_email",
    }),
});

export async function changeUser(
  updateEmail: (email: string) => void,
  email: string,
  onFinish: () => void,
  prevState: unknown,
  formData: FormData
) {
  const result = updateValuesSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (result.success === false) {
    return result.error.formErrors.fieldErrors;
  }

  const data = result.data;

  const valuesToUpdate: { name?: string; surname?: string } = {};

  const user = await getUser(email);

  if (user == null) return;

  if (user.name !== data.name) {
    valuesToUpdate.name = data.name;
  }

  if (user.surname !== data.surname) {
    valuesToUpdate.surname = data.surname;
  }

  const userDoc = doc(db, "users", user.id);

  if (Object.keys(valuesToUpdate).length > 0) {
    await updateDoc(userDoc, {
      ...valuesToUpdate,
    });
  }

  if (user.email !== data.email) {
    updateEmail(data.email);
  } else {
    onFinish();
  }
}
