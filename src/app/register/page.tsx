"use client";

import {
  AuthenticationComponent,
  AuthenticationInputProps,
} from "@/components/auth/AuthenticationComponent";
import { useAuthentication } from "@/hooks/auth/useAuthentication.hook";
import Swal from "sweetalert2";

type Props = {};

const Register = (props: Props) => {
  const { registerUser } = useAuthentication();

  const handleRegister = async (params: AuthenticationInputProps) => {
    if (
      params.email &&
      params.password &&
      params.confirmPassword &&
      params.fullName
    ) {
      if (params.password !== params.confirmPassword) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Passwords do not match",
          confirmButtonColor: "#3085d6",
        });
        return;
      }
      await registerUser(params.fullName, params.email, params.password);
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
      <AuthenticationComponent type="edit" onSubmitForm={handleRegister} />
    </main>
  );
};

export default Register;
