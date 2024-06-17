"use client";

import { TLocale } from "../../../../../../../i18n.config";
import { TUser } from "@/@types/general";
import { useDictionary } from "@/hooks/useDictionary";
import { useState } from "react";
import { useAuthProvider } from "@/providers/AuthProvider";
import { auth } from "@/firebase";
import { FormInput } from "@/components/FormInput";
import {
  EmailAuthProvider,
  User,
  reauthenticateWithCredential,
} from "firebase/auth";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleUserDelete, handleLogOut, reauthenticate, authProvider } =
    useAuthProvider();

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

  if (deleteUser == null) return null;

  return (
    <div className="bg-white p-6 text-black w-[90%] sm:w-auto rounded-sm border-solid border border-purple-800">
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
              <div className="text-red-500">{errorMessage}</div>
            )}
            <button
              className="w-full mt-6 px-2 py-1 md:px-3 md:py-2 border-solid border border-red-500 bg-red-500 text-white rounded-md disabled:opacity-75 disabled:cursor-default hover:opacity-75"
              type="submit"
              disabled={loading}
            >
              {loading
                ? `${translations.page.loading}...`
                : translations.page.delete}
            </button>
            <button
              type="button"
              className="w-full px-2 py-1 md:px-3 md:py-2 border-solid border border-purple-800 rounded-md text-purple-800 bg-gray-100"
              onClick={closeModal}
            >
              {translations.page.cancel}
            </button>
          </>
        ) : (
          <div className="flex items-center jsutify-between gap-3">
            {errorMessage === "" && (
              <button
                disabled={loading}
                type="submit"
                className="w-full px-2 py-1 md:px-3 md:py-2 border-solid border border-red-500 bg-red-500 text-white rounded-md disabled:opacity-75 disabled:cursor-default hover:opacity-75"
              >
                {translations.page.yes}
              </button>
            )}
            <button
              onClick={closeModal}
              type="button"
              className="w-full px-2 py-1 md:px-3 md:py-2 border-solid border border-purple-800 rounded-md text-purple-800 bg-gray-100"
            >
              {translations.page.no}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
