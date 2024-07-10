import { MonkeyIcon } from "@/assets/icons";
import { Open_Sans } from "next/font/google";

export function Logo() {
  return null;
  return (
    <div className="w-[80%] mx-auto flex items-end text-purple-800 pt-4 gap-x-3">
      <MonkeyIcon className="text-7xl " />
      <h2 className="text-3xl font-semibold font-poppins">NFT Marketplace</h2>
    </div>
  );
}
