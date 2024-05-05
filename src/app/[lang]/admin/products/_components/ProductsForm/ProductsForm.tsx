"use client";

import { useState } from "react";
import { createProduct } from "@/app/[lang]/admin/_actions/products";
import { FormInput } from "@/components/FormInput";
import { formatCurrency } from "@/lib/formatters";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/app/[lang]/admin/products/_components/ProductsForm/SubmitButton";

export function ProductsForm() {
  const [error, action] = useFormState(createProduct, {});
  const [priceInCents, setPriceInCents] = useState<string>("");


  return (
    <form action={action} className="flex flex-col gap-y-4 max-w-4xl mt-9">
      <FormInput label="Name" name="name" onFocus={() => {}} required />
      {error?.name && <div className="text-red-700">{error.name}</div>}

      <>
        <label
          htmlFor="description"
          className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl"
        >
          Description
        </label>
        <textarea
          name="description"
          required
          className="overflow-y-auto h-40 border border-solid border-blue-300 p-2 rounded-md outline-none resize-none"
          id="description"
        />
      </>
      {error?.description && (
        <div className="text-red-700">{error.description}</div>
      )}

      <FormInput
        label="Price In Cents"
        name="priceInCents"
        value={priceInCents}
        onChange={(e) => setPriceInCents(e.target.value)}
        onFocus={() => {}}
        required
      />
      <div>{formatCurrency(Number(priceInCents) / 100)}</div>
      {error?.priceInCents && (
        <div className="text-red-700">{error.priceInCents}</div>
      )}

      <label
        htmlFor="filePath"
        className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl"
      >
        Choose File
      </label>
      <input
        type="file"
        name="filePath"
        id="filePath"
        required
        className="cursor-pointer"
      />
      {error?.filePath && <div className="text-red-700">{error.filePath}</div>}

      <>
        <label
          htmlFor="imagePath"
          className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl"
        >
          Choose Image
        </label>
        <input
          name="imagePath"
          accept="image/*"
          type="file"
          id="imagePath"
          required
          className="cursor-pointer"
        />
      </>
      {error?.imagePath && (
        <div className="text-red-700">{error.imagePath}</div>
      )}

      <SubmitButton />
    </form>
  );
}
