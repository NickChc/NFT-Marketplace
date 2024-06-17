import { ClosedEyeIcon, OpenEyeIcon } from "@/assets/icons";
import { useState } from "react";

interface FormInputProps {
  name: string;
  label: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  type?: "text" | "password" | "file" | "email" | "number";
  required?: boolean;
  defaultValue?: string;
}

export function FormInput({
  value,
  name,
  label,
  onChange,
  onFocus,
  type,
  required,
  defaultValue,
}: FormInputProps) {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <label
        htmlFor={name}
        className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl"
      >
        {label}
      </label>
      <div className="relative flex items-stretch flex-col">
        {type === "password" && (
          <span
            className="absolute top-1/2 right-3 -translate-y-1/2 text-xl md:text-2xl text-white cursor-pointer active:opacity-75"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? <ClosedEyeIcon /> : <OpenEyeIcon />}
          </span>
        )}
        <input
          required={required}
          type={type === "password" ? (show ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          name={name}
          onFocus={onFocus}
          id={name}
          defaultValue={defaultValue}
          className={`p-2 outline-none border border-solid border-blue-300 rounded-md bg-white text-black dark:bg-gray-900 dark:text-white ${
            type === "number" ? "appearance-none" : ""
          }`}
        />
      </div>
    </>
  );
}
