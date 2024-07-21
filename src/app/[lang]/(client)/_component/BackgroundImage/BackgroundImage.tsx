"use client";

import BackgroundImg from "@/assets/images/WallpaperX.jpg";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function BackgroundImage() {
  const pathname = usePathname();

  if (pathname.includes("auth")) return null;

  return (
    <div className="fixed z-0 inset-0 pointer-events-none select-none">
      <Image
        src={BackgroundImg}
        alt="background image"
        layout="fill"
        className="pointer-events-none"
      />
    </div>
  );
}
