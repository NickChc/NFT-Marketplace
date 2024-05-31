"use client";

import { useAuthProvider } from "@/providers/AuthProvider";
import { formatCurrency } from "@/lib/formatters";


export function ProfileData() {
  const { currentUser } = useAuthProvider();
  
  return (
    <div className="flex flex-col gap-3 sm:text-xl md:text-2xl">
      <h3 className="truncate max-w-[95%]">
        <span className="font-semibold">Name -</span> {currentUser?.name}
      </h3>
      <h3 className="truncate max-w-[95%]">
        <span className="font-semibold">Surname -</span> {currentUser?.surname}
      </h3>
      <h3 className="truncate max-w-[95%]">
        <span className="font-semibold">Email -</span> {currentUser?.email}
      </h3>
      <button className="p-1 w-full bg-purple-800 font-semibold rounded-md duration-100 hover:opacity-75">EDIT</button>
      <hr className="w-full my-3" />
      <h3 className="truncate max-w-[95%]">
        <span className="font-semibold">Total Spent</span> -{" "}
        {formatCurrency(currentUser?.spentInCents || 0 / 100)}
      </h3>
    </div>
  );
}
