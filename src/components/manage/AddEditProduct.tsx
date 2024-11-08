"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Button } from "../common/Button";

export interface AddEditProductProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  type: "add" | "edit";
  onSubmitForm: (params: ProductInputProps) => void;
  initialValue?: ProductInputProps;
}

export interface ProductInputProps {
  name?: string;
  image?: string;
  price?: number;
  description?: string;
  quantity?: number;
}

function Component({
  className,
  onSubmitForm,
  initialValue,
  ...restProps
}: AddEditProductProps) {
  const [name, setName] = React.useState<string>("");
  const [image, setImage] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [price, setPrice] = React.useState<number>(0);
  const [quantity, setQuantity] = React.useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData: ProductInputProps = {};
    if (name) {
      submitData["name"] = name;
    }
    if (image) {
      submitData["image"] = image;
    }
    if (description) {
      submitData["description"] = description;
    }
    if (price >= 0) {
      submitData["price"] = price;
    }
    if (quantity >= 0) {
      submitData["quantity"] = quantity;
    }

    onSubmitForm(submitData);
  };

  useEffect(() => {
    setName(initialValue?.name || "");
    setImage(initialValue?.image || "");
    setDescription(initialValue?.description || "");
    setPrice(initialValue?.price || 0);
    setQuantity(initialValue?.quantity || 0);
  }, [initialValue]);

  return (
    <section
      className={`w-full md:rounded-md relative z-50 overflow-hidden pt-[30px] pr-10 pl-8 pb-10 min-h-[150px] h-screen md:h-auto ${className}`}
      {...restProps}
    >
      <Image
        height={1}
        width={1}
        src="/background/inquiry_banner.svg"
        alt="Backgrund Banner"
        className="w-full h-full object-cover absolute top-0 left-0 z-10"
      />
      <div className="relative z-20 flex flex-col md:flex-row md:justify-between h-full w-full md:w-auto">
        <div className="md:max-w-[440px] mb-14">
          <h2 className="text-white font-semibold text-[18px] md:text-[32px] mb-4 md:mb-3">
            Simple Product Management Application
          </h2>
          <span className="text-white block">
            {restProps.type === "add"
              ? "Add new product"
              : "Edit product information"}
          </span>
        </div>
        <div className="bg-white md:block rounded-md h-auto md:h-full w-full md:w-[491px] pt-[22px] pl-5 pr-8 pb-6 relative">
          <span className="text-xl font-semibold">Product Detail</span>
          <form
            action=""
            className="mt-[18px] flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="w-full p-[10px] rounded-md border-2 focus-visible:outline-none border-[#DEE2E7]"
              placeholder="Product Name"
            />
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              type="text"
              className="w-full p-[10px] rounded-md border-2 focus-visible:outline-none border-[#DEE2E7]"
              placeholder="Product Image Url"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-md border-2 focus-visible:outline-none p-3"
              placeholder="Type more detail"
            ></textarea>
            <div className="flex gap-2">
              <input
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                type="number"
                className="w-[46%] p-[10px] rounded-md border-2 focus-visible:outline-none border-[#DEE2E7]"
                placeholder="Quantity"
              />
              <select
                className="p-[10px] min-w-[111px] rounded-md border-2 focus-visible:outline-none border-[#DEE2E7]"
                defaultValue={"Pcs"}
                disabled
              >
                <option value="Pcs">
                  Pcs
                </option>
              </select>
            </div>
            <input
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              type="number"
              className="w-full p-[10px] rounded-md border-2 focus-visible:outline-none border-[#DEE2E7]"
              placeholder="Price"
            />
            <Button
              buttonType="primary"
              className="rounded-md px-5 w-auto"
              type="submit"
            >
              {restProps.type === "add" ? "Add" : "Edit"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export const AddEditProduct = React.memo(Component);
