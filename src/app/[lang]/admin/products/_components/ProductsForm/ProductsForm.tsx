"use client";

import { useState } from "react";
import { createProduct } from "@/app/[lang]/admin/_actions/products";
import { FormInput } from "@/components/FormInput";
import { formatCurrency } from "@/lib/formatters";

interface FormDataProps {
  name: string;
  description: string;
  priceInCents: string;
  filePath: File | null;
  imagePath: File | null;
}

export function ProductsForm() {
  const [formData, setFormData] = useState<FormDataProps>({
    name: "",
    description: "",
    priceInCents: "0",
    filePath: null,
    imagePath: null,
  });

  const priceRegex = /^(?:\d+\.?\d*|\.\d+)$|^$/;

  function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData((prev) => {
      if (e.target.name === "priceInCents") {
        if (!priceRegex.test(e.target.value)) return { ...prev };
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      }
      return { ...prev, [e.target.name]: e.target.value };
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createProduct(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-4 max-w-4xl mt-9"
    >
      <FormInput
        label="Name"
        name="name"
        value={formData.name}
        onChange={inputChange}
        onFocus={() => {}}
      />

      <>
        <label
          htmlFor="description"
          className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl"
        >
          Description
        </label>
        <textarea
          className="overflow-y-auto h-40 border border-solid border-blue-300 p-2 rounded-md outline-none resize-none"
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              description: e.target.value,
            }))
          }
        />
      </>

      <FormInput
        label="Price In Cents"
        name="priceInCents"
        value={formData.priceInCents}
        onChange={inputChange}
        onFocus={() => {}}
      />
      <div>{formatCurrency(Number(formData.priceInCents))}</div>

      <>
        <label
          htmlFor="filePath"
          className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl"
        >
          Choose File
        </label>
        <input
          type="file"
          id="filePath"
          onChange={(e) => e.target.files?.[0] || null}
          className="cursor-pointer"
        />
      </>

      <>
        <label
          htmlFor="imagePath"
          className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl"
        >
          Choose Image
        </label>
        <input
          type="file"
          id="imagePath"
          onChange={(e) => e.target.files?.[0] || null}
          className="cursor-pointer"
        />
      </>

      <button
        type="submit"
        className={`border border-solid border-blue-300 text-blue-300 font-semibold  rounded-md p-3 my-6 hover:bg-blue-500 hover:text-white duration-150`}
      >
        Submit
      </button>
    </form>
  );
}
