"use client";

import { TUser } from "@/@types/general";
import { FormInput } from "@/components/FormInput";
import { useDictionary } from "@/hooks/useDictionary";
import { useFormState } from "react-dom";
import { changeUser } from "@/app/[lang]/(client)/_actions/user";
import { auth } from "@/firebase";
import { SubmitUpdateUser } from "./SubmitUpdateUser";
import { updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { useGlobalProvider } from "@/providers/GlobalProvider";
import { useState } from "react";
import { useAuthProvider } from "@/providers/AuthProvider";
import { getUser } from "@/app/[lang]/_api/getUser";

interface UpdateUserFormProps {
  updateUser: TUser | null;
  closeModal: () => void;
}

export function UpdateUserForm({
  updateUser,
  closeModal,
}: UpdateUserFormProps) {
  const translations = useDictionary();
  const [emailError, setEmailError] = useState<string>("");
  const [emailMessage, setEmailMessage] = useState<string>("");
  const [error, action] = useFormState(
    changeUser.bind(null, emailUpdate, updateUser?.email || "", onFinish),
    {}
  );
  const { handleLogOut } = useAuthProvider();
  const { setUpdateUser } = useGlobalProvider();

  function onFinish() {
    setUpdateUser(null);
  }

  async function emailUpdate(email: string) {
    try {
      if (auth.currentUser == null) return;
      await verifyBeforeUpdateEmail(auth.currentUser, email);
      setEmailMessage(translations.page.verifyNewEmail);
    } catch (error: any) {
      console.log(error.message);
      if (error.message.includes("requires-recent-login")) {
        setEmailError(translations.page.reLogin);
      }
    }
  }

  if (updateUser == null) return null;

  return (
    <form
      className=" flex flex-col p-3 bg-white dark:bg-gray-900 border-solid border border-purple-700 rounded-md w-[90%] sm:w-auto gap-3"
      action={action}
    >
      <h3 className="text-sm sm:text-lg text-center">
        {translations.page.noChangeFields}
      </h3>
      <FormInput
        label={translations.page.name}
        name="name"
        defaultValue={updateUser?.name}
      />
      {error?.name && <div>{error.name}</div>}

      <FormInput
        label={translations.page.surname}
        name="surname"
        defaultValue={updateUser?.surname}
      />
      {error?.surname && <div>{error.surname}</div>}

      <FormInput
        label={translations.page.email}
        name="email"
        defaultValue={updateUser?.email}
      />
      {error?.email && <div>{error.email}</div>}

      {emailError !== "" && <div className="text-red-500">{emailError}</div>}
      {emailMessage !== "" && (
        <div className="flex items-center gap-3 justify-around">
          <h3>{emailMessage}.</h3>
          <button
            type="button"
            className="border-solid border border-purple-900 text-purple-800 px-2 py-1 bg-white rounded-md"
            onClick={async () => {
              await handleLogOut();
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
      <button
        className="bg-white p-2 border-solid border rounded-sm border-purple-800 text-purple-800"
        type="button"
        onClick={closeModal}
      >
        {translations.page.cancel}
      </button>
    </form>
  );
}
