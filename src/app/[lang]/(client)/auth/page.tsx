import { redirect } from "next/navigation";

export default function AuthRedirect() {
  redirect("/auth/sign-up");
}
