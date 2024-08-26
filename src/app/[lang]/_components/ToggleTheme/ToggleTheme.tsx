"use client";

enum TThemeMode_Enum {
  DARK = "dark",
  LIGHT = "light",
}

import { useState, useEffect, useMemo } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "@/assets/icons";

export function ToggleTheme() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [anim, setAnim] = useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();

  const memoizeToggleTheme = useMemo(() => {
    function toggleTheme() {
      setAnim(true);
      if (resolvedTheme === TThemeMode_Enum.DARK) {
        setTheme(TThemeMode_Enum.LIGHT);
      } else {
        setTheme(TThemeMode_Enum.DARK);
      }
    }
    return toggleTheme;
  }, [resolvedTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <span
        suppressHydrationWarning
        className="opacity-50 relative sm:absolute top-1/2 sm:-translate-y-1/2 right-3 text-sm sm:text-lg md:text-xl bg-custom-white rounded-full w-8 md:w-10 aspect-square text-add"
      >
        <MoonIcon className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 " />
      </span>
    );
  }

  return (
    <span
      suppressHydrationWarning
      className={`relative sm:absolute top-1/2 sm:-translate-y-1/2 right-3 text-sm sm:text-lg md:text-xl bg-custom-white rounded-full w-8 md:w-10 aspect-square text-add cursor-pointer `}
      onClick={memoizeToggleTheme}
    >
      <SunIcon
        className={`duration-500 absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 ${
          resolvedTheme === TThemeMode_Enum.LIGHT
            ? "rotate-90 scale-0 opacity-0 "
            : ""
        }`}
      />
      <MoonIcon
        className={`duration-500 absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2 ${
          resolvedTheme === TThemeMode_Enum.DARK
            ? "rotate-90 scale-0 opacity-0 "
            : ""
        }`}
      />
    </span>
  );
}
