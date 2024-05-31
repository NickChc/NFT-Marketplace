"use client";

import BackgroundImg from "@/assets/images/BackgroundImage.jpg";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function BackgroundImage() {
  const pathname = usePathname();

  if (pathname.includes("auth")) return null;

  return (
    <div className="absolute z-0 inset-0">
      <Image
        src={BackgroundImg}
        alt="background image"
        objectFit="cover"
        layout="fill"
        className="pointer-events-none"
      />
    </div>
  );
}
