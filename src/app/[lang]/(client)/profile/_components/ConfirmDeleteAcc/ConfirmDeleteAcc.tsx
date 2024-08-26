"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { TUser } from "@/@types/general";
import { useDictionary } from "@/hooks/useDictionary";
import { useEffect, useState } from "react";
import { useAuthProvider } from "@/providers/AuthProvider";
import { auth } from "@/firebase";
import { FormInput } from "@/components/FormInput";
import {
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
} from "firebase/auth";
import { DualButton } from "@/app/[lang]/_components/DualButton";

interface ConfirmDeleteAccProps {
  lang: TLocale;
  closeModal: () => void;
  deleteUser: TUser | null;
}

export function ConfirmDeleteAcc({
  lang,
  closeModal,
  deleteUser,
}: ConfirmDeleteAccProps) {
  const translations = useDictionary();
  const [mounted, setMounted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleUserDelete, authProvider } = useAuthProvider();

  function onError(error: string) {
    if (error.includes("requires-recent-login")) {
      setErrorMessage(translations.page.reLogin);
    }
  }

  async function checkReauth(user: User) {
    try {
      setErrorMessage("");
      if (user.email == null) return;
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      return true;
    } catch (error: any) {
      console.log(error.message);
      setErrorMessage(translations.page.invalidPassword);
    }
  }

  async function handleDelete(user: User) {
    try {
      setLoading(true);
      setErrorMessage("");
      await handleUserDelete(user, closeModal, onError);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      if (auth.currentUser == null) return;

      if (authProvider === "password") {
        const result = await checkReauth(auth.currentUser);
        if (result) {
          await handleDelete(auth.currentUser);
        }
      } else {
        await handleDelete(auth.currentUser);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (deleteUser == null) return;

    setMounted(true);
  }, [deleteUser]);

  if (deleteUser == null) return null;

  return (
    <div
      className={`bg-custom-white p-6 text-black w-[90%] sm:w-auto rounded-sm border-solid border border-add transition-display duration-300 start-style-x-100 ${
        mounted ? "block" : "hidden"
      }`}
    >
      <h4 className="font-semibold sm:text-lg md:text-xl text-center">
        {authProvider === "password"
          ? lang === "ka"
            ? `დაადასტურეთ თქვენი ვინაობა, რათა წაშალოთ ანგარიში`
            : `Confirm your identity to delete account`
          : lang === "ka"
          ? `დარწმუნებული ხართ, რომ გსურთ ანგარიშის წაშლა?`
          : `Are you sure you want to delete your account?`}
      </h4>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-6 justify-center "
      >
        {authProvider === "password" ? (
          <>
            <FormInput
              required
              label={translations.page.password}
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage !== "" && (
              <div className="text-alert">{errorMessage}</div>
            )}
            <div className="my-2"></div>
            <DualButton
              size="medium"
              variation="warning"
              type="submit"
              disabled={loading}
              loadSpinnerText={loading ? translations.page.deleting : undefined}
            >
              {translations.page.delete}
            </DualButton>
            <DualButton
              size="medium"
              variation="secondary"
              type="button"
              onClick={closeModal}
            >
              {translations.page.cancel}
            </DualButton>
          </>
        ) : (
          <div className="flex items-center jsutify-between gap-3">
            {errorMessage === "" && (
              <DualButton
                variation="warning"
                size="medium"
                disabled={loading}
                type="submit"
              >
                {translations.page.yes}
              </DualButton>
            )}
            <DualButton
              variation="secondary"
              size="medium"
              onClick={closeModal}
              type="button"
            >
              {translations.page.no}
            </DualButton>
          </div>
        )}
      </form>
    </div>
  );
}
