"use client";

import {
  AuthenticationComponent,
  AuthenticationInputProps,
} from "@/components/auth/AuthenticationComponent";
import { useAuthentication } from "@/hooks/auth/useAuthentication.hook";
import Swal from "sweetalert2";

type Props = {};

const Login = (props: Props) => {
  const { loginUser } = useAuthentication();

  const handleLogin = async (params: AuthenticationInputProps) => {
    if (params.email && params.password) {
      await loginUser(params.email, params.password);
      return;
    }
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please enter email and password",
      confirmButtonColor: "#3085d6",
    });
  };
  return (
    <main className="flex flex-wrap max-w-[1180px] pt-5 mx-auto min-h-full pb-10">
      <AuthenticationComponent type="add" onSubmitForm={handleLogin} />
    </main>
  );
};

export default Login;
