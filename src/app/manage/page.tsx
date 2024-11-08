"use client";
import ProductTable from "@/components/manage/ProductTable";
import { useProduct } from "@/hooks/product/useProduct.hook";
import { useEffect } from "react";
import Swal from "sweetalert2";

type Props = {};

const Manage = (props: Props) => {
  const {
    fetchProducts,
    products,
    handlePageChange,
    pagination,
    deleteProduct,
  } = useProduct();

  const handleDeleteProduct = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure you want to delete this product?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "red",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
    if (confirm.isConfirmed) {
      await deleteProduct(id);
      fetchProducts(1, 10, "");
    }
  };

  useEffect(() => {
    fetchProducts(pagination.currentPage, 10, "");
  }, []);
  return (
    <main className="flex flex-wrap max-w-[1180px] pt-5 mx-auto min-h-full pb-10">
      <ProductTable
        products={products}
        {...pagination}
        onPageChange={handlePageChange}
        handleDeleteProduct={handleDeleteProduct}
      />
    </main>
  );
};

export default Manage;
