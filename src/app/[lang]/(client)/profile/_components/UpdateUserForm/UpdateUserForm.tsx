"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { TUser } from "@/@types/general";
import { FormInput } from "@/components/FormInput";
import { useDictionary } from "@/hooks/useDictionary";
import { useFormState } from "react-dom";
import { changeUser } from "@/app/[lang]/(client)/_actions/user";
import { auth } from "@/firebase";
import { SubmitUpdateUser } from "./SubmitUpdateUser";
import {
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { useEffect, useState } from "react";
import { useAuthProvider } from "@/providers/AuthProvider";
import { DualButton } from "@/app/[lang]/_components/DualButton";
import { useRouter } from "next/navigation";

interface UpdateUserFormProps {
  updateUser: TUser | null;
  closeModal: () => void;
  lang: TLocale;
}

export function UpdateUserForm({
  updateUser,
  closeModal,
  lang,
}: UpdateUserFormProps) {
  const translations = useDictionary();
  const [mounted, setMounted] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, action] = useFormState(
    changeUser.bind(null, emailUpdate, updateUser?.email || "", onFinish),
    {}
  );
  const { handleLogOut, reauthenticate, authProvider } = useAuthProvider();
  const { setUpdateUser } = useGlobalProvider();

  const router = useRouter();

  function onFinish() {
    setUpdateUser(null);
  }

  async function checkReauth(user: User) {
    try {
      setErrorMessage("");
      if (user.email == null) return false;
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (error: any) {
      console.log(error.message);
      setErrorMessage(translations.page.invalidPassword);
      return false;
    }
  }

  async function emailUpdate(email: string) {
    try {
      if (auth.currentUser == null) return;
      if (authProvider === "password") {
        const result = await checkReauth(auth.currentUser);
        if (!result) {
          if (password === "") {
            setErrorMessage(translations.page.authValidation.emptyField);
          } else {
            setErrorMessage(translations.page.invalidPassword);
          }
        } else {
          await verifyBeforeUpdateEmail(auth.currentUser, email);
          setEmailMessage(translations.page.verifyNewEmail);
        }
      } else {
        const result = await reauthenticate(auth.currentUser);
        if (result) {
          await verifyBeforeUpdateEmail(auth.currentUser, email);
          setEmailMessage(translations.page.verifyNewEmail);
        }
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  async function onRender() {
    try {
      if (auth.currentUser == null) return;
      await reauthenticate(auth.currentUser, true);
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    onRender();
  }, []);

  useEffect(() => {
    if (updateUser == null) return;

    setMounted(true);
  }, [updateUser]);

  if (updateUser == null) return null;

  return (
    <form
      action={action}
      className={`flex-col p-3 bg-custom-white dark:bg-add-2 border-solid border border-add rounded-md w-[90%] max-h-[95dvh] text-sm sm:text-base sm:w-auto gap-3 transition-display duration-300 start-style-x-100 overflow-auto ${
        mounted ? "flex" : "hidden"
      }`}
    >
      <h3 className="text-sm sm:text-lg text-center">
        {translations.page.noChangeFields}
      </h3>
      <FormInput
        label={translations.page.name}
        name="name"
        defaultValue={updateUser?.name}
      />
      {error?.name && (
        <div className="text-alert">
          {translations.page.authValidation.emptyField}
        </div>
      )}

      <FormInput
        label={translations.page.surname}
        name="surname"
        defaultValue={updateUser?.surname}
      />
      {error?.surname && (
        <div className="text-alert">
          {translations.page.authValidation.emptyField}
        </div>
      )}

      <>
        {authProvider !== "password" ? (
          <input
            name="email"
            defaultValue={updateUser?.email}
            className="invisible"
          />
        ) : (
          <>
            <FormInput
              disabled={authProvider !== "password"}
              label={translations.page.email}
              name="email"
              defaultValue={updateUser?.email}
            />
            {error?.email && (
              <div className="text-alert">
                {error.email[0] === "Invalid email"
                  ? translations.page.invalidEmail
                  : error.email}
              </div>
            )}
          </>
        )}
        {authProvider === "password" && (
          <FormInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            type="password"
            label="password"
          />
        )}
        {emailMessage === "" && (
          <div className={errorMessage === "" ? "" : "text-alert"}>
            {authProvider !== "password"
              ? translations.page.registerToChangeEmail
              : errorMessage === ""
              ? translations.page.confirmIdToChange
              : errorMessage}
          </div>
        )}
      </>

      {emailError !== "" && <div className="text-alert">{emailError}</div>}
      {emailMessage !== "" && (
        <div className="flex items-center gap-3 justify-around">
          <h3>{emailMessage}.</h3>
          <button
            type="button"
            className="border-solid border border-add text-add px-2 py-1 bg-custom-white rounded-md"
            onClick={async () => {
              await handleLogOut();
              router.replace(`/${lang}/auth/sign-in`);
              closeModal();
            }}
          >
            {translations.page.verifiedCap}!
          </button>
        </div>
      )}

      <SubmitUpdateUser
        text={translations.page.change}
        pendingText={`${translations.page.processing}...`}
      />
      <DualButton
        size="medium"
        variation="secondary"
        type="button"
        onClick={closeModal}
      >
        {translations.page.cancel}
      </DualButton>
    </form>
  );
}
