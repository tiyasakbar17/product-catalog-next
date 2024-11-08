"use client";
import Pagination from "@/components/common/Pagination";
import { ProductList } from "@/components/home/ProductList";
import { useProduct } from "@/hooks/product/useProduct.hook";
import { useEffect } from "react";
import { useGeneralContext } from "../context/generalContext";

interface Props {}

export default function Home({}: Props) {
  const { products, fetchProducts, pagination, handlePageChange } =
    useProduct();
  const { search } = useGeneralContext();

  useEffect(() => {
    fetchProducts(1, 8, search);
  }, [search]);
  return (
    <main className="flex flex-col max-w-[1180px] px-4 pt-5 mx-auto min-h-full pb-10">
      <ProductList products={products} />
      <section className="flex justify-end">
        <Pagination {...pagination} onPageChange={handlePageChange} />
      </section>
    </main>
  );
}
