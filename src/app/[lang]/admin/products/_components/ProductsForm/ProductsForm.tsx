"use client";

import { useState } from "react";
import {
  createProduct,
  editProduct,
} from "@/app/[lang]/admin/_actions/products";
import { FormInput } from "@/components/FormInput";
import { formatCurrency } from "@/lib/formatters";
import { useFormState } from "react-dom";
import { SubmitButton } from "@/app/[lang]/admin/products/_components/ProductsForm/SubmitButton";
import { TProduct } from "@/@types/general";
import Image from "next/image";
import { useDictionary } from "@/hooks/useDictionary";

interface ProductsFormProps {
  product?: TProduct;
}

export function ProductsForm({ product }: ProductsFormProps) {
  const [error, action] = useFormState(
    product == null ? createProduct : editProduct.bind(null, product.id),
    {}
  );
  const [priceInCents, setPriceInCents] = useState<string>(
    product ? product.priceInCents.toString() : ""
  );

  const dictionary = useDictionary();

  return (
    <form action={action} className="flex flex-col gap-y-4 max-w-4xl mt-9">
      <FormInput
        label={dictionary.page.name}
        name="name"
        required={product == null}
        defaultValue={product?.name}
      />
      {error?.name && <div className="text-red-700">{error.name}</div>}

      <>
        <label
          htmlFor="description"
          className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl"
        >
          {dictionary.page.description}
        </label>
        <textarea
          name="description"
          required={product == null}
          id="description"
          defaultValue={product?.description}
          className="overflow-y-auto h-40 border border-solid border-blue-300 p-2 rounded-md outline-none resize-none"
        />
      </>
      {error?.description && (
        <div className="text-red-700">{error.description}</div>
      )}

      <FormInput
        label={dictionary.page.priceInCents}
        name="priceInCents"
        value={priceInCents}
        onChange={(e) => setPriceInCents(e.target.value)}
        onFocus={() => {}}
        required={product == null}
      />
      <div>{formatCurrency(Number(priceInCents) / 100)}</div>
      {error?.priceInCents && (
        <div className="text-red-700">{error.priceInCents}</div>
      )}

      <label
        htmlFor="filePath"
        className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl"
      >
        {dictionary.page.chooseFile}
      </label>
      <input
        type="file"
        name="filePath"
        id="filePath"
        required={product == null}
        className="cursor-pointer"
      />
      {error?.filePath && <div className="text-red-700">{error.filePath}</div>}
      {product && <div>{product.filePath}</div>}

      <>
        <label
          htmlFor="imagePath"
          className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl"
        >
          {dictionary.page.chooseImage}
        </label>
        <input
          name="imagePath"
          accept="image/*"
          type="file"
          id="imagePath"
          required={product == null}
          className="cursor-pointer"
        />
      </>
      {error?.imagePath && (
        <div className="text-red-700">{error.imagePath}</div>
      )}
      {product && (
        <Image
          src={product.imagePath}
          alt="Product Image"
          width={500}
          height={400}
        />
      )}

      <SubmitButton isEdit={product != null} />
    </form>
  );
}
