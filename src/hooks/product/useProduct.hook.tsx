import { ProductInputProps } from "@/components/manage/AddEditProduct";
import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";

export const useProduct = () => {
  const [productDetail, setProductDetail] = useState({});
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    search: "",
    currentPage: 1,
    totalPages: 1,
  });

  const fetchProducts = async (page: number, limit: number, search: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product?page=${page}&limit=${limit}&search=${search}`
      );
      setProducts(response.data.data);
      setPagination((prev) => ({
        ...prev,
        currentPage: response.data.meta.page,
        totalPages:
          response.data.meta.total % limit === 0
            ? response.data.meta.total / limit
            : Math.floor(response.data.meta.total / limit) + 1,
        search: search,
      }));
    } catch (error) {
      console.error({ error });
    }
  };

  const handlePageChange = (page: number) => {
    fetchProducts(page, 8, "");
  };

  const handleSearch = (search: string) => {
    fetchProducts(1, 8, search);
  };

  const deleteProduct = async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/delete/${id}`
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product deleted successfully",
        confirmButtonColor: "#3085d6",
      });
      return true;
    } catch (error) {
      console.error({ error });
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete product",
        confirmButtonColor: "#3085d6",
      });
      return false;
    }
  };

  const addNewProduct = async (data: ProductInputProps) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/create`,
        data
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product added successfully",
        confirmButtonColor: "#3085d6",
      });

      window.location.href = "/manage";
    } catch (error: any) {
      console.error({ error });
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message ?? "Failed to add product",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  const getProductDetail = async (id: number) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/${id}`
      );

      setProductDetail(response.data.data);
    } catch (error) {
      console.error({ error });
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to get product detail",
        confirmButtonColor: "#3085d6",
      });
      window.location.href = "/manage";
    }
  };

  const editProductDetail = async (id: number, data: ProductInputProps) => {
    try {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/product/update/${id}`,
        data
      );
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product updated successfully",
        confirmButtonColor: "#3085d6",
      });
      window.location.href = "/manage";
    } catch (error) {
      console.error({ error });
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update product",
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return {
    productDetail,
    products,
    setProducts,
    fetchProducts,
    pagination,
    handlePageChange,
    handleSearch,
    deleteProduct,
    addNewProduct,
    getProductDetail,
    editProductDetail,
  };
};
