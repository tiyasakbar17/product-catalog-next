"use client";
import {
  AddEditProduct,
  ProductInputProps,
} from "@/components/manage/AddEditProduct";
import { useProduct } from "@/hooks/product/useProduct.hook";
import { useEffect } from "react";
import Swal from "sweetalert2";

type Props = {
  params: {
    id: string;
  };
};

const EditProduct = ({ params: { id } }: Props) => {
  const { getProductDetail, productDetail, editProductDetail } = useProduct();
  useEffect(() => {
    getProductDetail(+id);
  }, [id]);

  const handleEditProduct = async (params: ProductInputProps) => {
    if (
      params.name &&
      params.image &&
      params.description &&
      params.price &&
      params.quantity &&
      params.price > 0 &&
      params.quantity > 0
    ) {
      await editProductDetail(+id, params);
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
      <AddEditProduct
        type="edit"
        onSubmitForm={handleEditProduct}
        initialValue={productDetail}
      />
    </main>
  );
};

export default EditProduct;
