"use client";

import { TProduct } from "@/@types/general";
import { DotsIcon } from "@/assets/icons";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  deleteProduct,
  toggleAvailability,
} from "@/app/[lang]/admin/_actions/products";
import { TLocale } from "../../../../../../../i18n.config";
import Link from "next/link";

interface DropdownMenuProps {
  lang: TLocale;
  product: TProduct;
  text: {
    deleteProduct: string;
    edit: string;
    deactivate: string;
    activate: string;
  };
}

export function DropdownMenu({ product, text, lang }: DropdownMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  async function toggleAvailable() {
    try {
      await toggleAvailability(product, !product.isAvailable);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      router.refresh();
    }
  }

  async function handleDelete() {
    try {
      await deleteProduct(product);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      router.refresh();
    }
  }

  function closePopup() {
    setOpen(false);
  }

  useEffect(() => {
    if (open) {
      document.addEventListener("click", closePopup);

      return () => {
        document.removeEventListener("click", closePopup);
      };
    }
  }, [open]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`p-2 ${open ? "cursor-default" : "cursor-pointer"}`}
      >
        <DotsIcon />
      </button>
      {open && (
        <div className="absolute top-6 right-6 p-1 flex flex-col items-start z-50 bg-white rounded-md">
          <button
            className="w-full cursor-pointer disabled:cursor-default text-left p-1 hover:bg-gray-300 rounded-t-md dark:text-black "
            onClick={toggleAvailable}
          >
            {product.isAvailable ? text.deactivate : text.activate}
          </button>
          <button className="w-full cursor-pointer disabled:cursor-default text-left p-1 hover:bg-gray-300 dark:text-black">
            <Link href={`/admin/products/${product.id}/edit`}>{text.edit}</Link>
          </button>
          <button
            disabled={product.orders > 0}
            className="w-full cursor-pointer disabled:cursor-default bg-red-300 text-left p-1 hover:text-red-800 rounded-b-md dark:text-black dark:hover:text-red-800"
            onClick={handleDelete}
          >
            {text.deleteProduct}
          </button>
        </div>
      )}
    </div>
  );
}
