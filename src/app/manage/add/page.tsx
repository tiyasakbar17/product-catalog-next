"use client";
import {
    AddEditProduct,
    ProductInputProps,
} from "@/components/manage/AddEditProduct";
import { useProduct } from "@/hooks/product/useProduct.hook";
import Swal from "sweetalert2";

type Props = {};

const AddProduct = (props: Props) => {
  const { addNewProduct } = useProduct();

  const handleAddProduct = async (params: ProductInputProps) => {
    //   Check if all fields are filled
    if (
      params.name &&
      params.image &&
      params.description &&
      params.price &&
      params.quantity &&
      params.price > 0 &&
      params.quantity > 0
    ) {
      await addNewProduct(params);
      return;
    }

    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please fill all fields correctly",
      confirmButtonColor: "#3085d6",
    });
  };
  return (
    <main className="flex flex-wrap max-w-[1180px] pt-5 mx-auto min-h-full pb-10">
      <AddEditProduct type="add" onSubmitForm={handleAddProduct} />
    </main>
  );
};

export default AddProduct;
