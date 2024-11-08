import { useGeneralContext } from "@/context/generalContext";
import axios from "axios";
import Swal from "sweetalert2";

export const useAuthentication = () => {
  const { setUserData } = useGeneralContext();

  const loginUser = async (email?: string, password?: string) => {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    if (token && userData) {
      setUserData({ ...userData });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      document.cookie = `token=${token}; path=/;`;
      return;
    }
    if (email && password) {
      try {
        const userLoginData = await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            email,
            password,
          }
        );
        setUserData({ ...userLoginData.data.data.userData });
        localStorage.setItem("token", userLoginData.data.data.token);
        localStorage.setItem(
          "userData",
          JSON.stringify(userLoginData.data.data.userData)
        );
        document.cookie = `token=${userLoginData.data.data.token}; path=/;`;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userLoginData.data.data.token}`;
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Login Success",
          confirmButtonColor: "#3085d6",
        });
        window.location.href = "/manage";
      } catch (error: any) {
        console.error({ error });
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.message,
          confirmButtonColor: "#3085d6",
        });
      }
    }
  };

  const registerUser = async (
    name: string,
    email: string,
    password: string
  ) => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        fullName: name,
        email,
        password,
      });
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Register Success",
        confirmButtonColor: "#3085d6",
      });
      window.location.href = "/login";
    } catch (error: any) {
      console.error({ error });
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response.data.message,
        confirmButtonColor: "#3085d6",
      });
    }
  };

  return { loginUser, registerUser };
};
