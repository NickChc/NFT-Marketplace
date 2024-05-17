interface FormInputProps {
  name: string;
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  type?: "text" | "password" | "file" | "email";
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
  return (
    <>
      <label
        htmlFor={name}
        className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl"
      >
        {label}
      </label>
      <input
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        onFocus={onFocus}
        id={name}
        className={`p-2 outline-none border border-solid border-blue-300 rounded-md`}
        defaultValue={defaultValue}
      />
    </>
  );
}
