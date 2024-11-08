"use client";
import Image from "next/image";
import React from "react";
import { Button } from "../common/Button";

export interface AuthenticationComponentProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  type: "add" | "edit";
  onSubmitForm: (params: AuthenticationInputProps) => void;
}

export interface AuthenticationInputProps {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

function Component({
  className,
  onSubmitForm,
  ...restProps
}: AuthenticationComponentProps) {
  const fullNameRef = React.useRef<HTMLInputElement>(null);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const confirmPasswordRef = React.useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submitData: AuthenticationInputProps = {};
    if (fullNameRef.current) {
      submitData["fullName"] = fullNameRef.current.value;
    }
    if (emailRef.current) {
      submitData["email"] = emailRef.current.value;
    }
    if (passwordRef.current) {
      submitData["password"] = passwordRef.current.value;
    }
    if (confirmPasswordRef.current) {
      submitData["confirmPassword"] = confirmPasswordRef.current.value;
    }

    onSubmitForm(submitData);
  };

  return (
    <section
      className={`w-full md:rounded-md relative z-50 overflow-hidden pt-[30px] pr-10 pl-8 pb-10 min-h-[150px] h-screen md:h-auto ${className}`}
      {...restProps}
    >
      <Image
        height={1}
        width={1}
        src="/background/inquiry_banner.svg"
        alt="Login Banner"
        className="w-full h-full object-cover absolute top-0 left-0 z-10"
      />
      <div className="relative z-20 flex flex-col md:flex-row md:justify-between h-full w-full md:w-auto">
        <div className="md:max-w-[440px] mb-14">
          <h2 className="text-white font-semibold text-[18px] md:text-[32px] mb-4 md:mb-3">
            Simple Product Management Application
          </h2>
          <span className="text-white block">
            This application is created to help you manage your products.
          </span>
        </div>
        <div className="bg-white md:block rounded-md h-auto md:h-full w-full md:w-[491px] pt-[22px] pl-5 pr-8 pb-6 relative">
          <span className="text-xl font-semibold">
            {restProps.type === "add" ? "Login" : "Register"}
          </span>
          <form
            action=""
            className="mt-[18px] flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            {restProps.type === "edit" && (
              <input
                ref={fullNameRef}
                type="text"
                className="w-full p-[10px] rounded-md border-2 focus-visible:outline-none border-[#DEE2E7]"
                placeholder="Full Name"
              />
            )}
            <input
              ref={emailRef}
              type="email"
              className="w-full p-[10px] rounded-md border-2 focus-visible:outline-none border-[#DEE2E7]"
              placeholder="Email"
            />
            <input
              ref={passwordRef}
              type="password"
              className="w-full p-[10px] rounded-md border-2 focus-visible:outline-none border-[#DEE2E7]"
              placeholder="Email"
            />
            {restProps.type === "edit" && (
              <input
                ref={confirmPasswordRef}
                type="password"
                className="w-full p-[10px] rounded-md border-2 focus-visible:outline-none border-[#DEE2E7]"
                placeholder="Confirm Password"
              />
            )}
            <Button
              buttonType="primary"
              className="max-w-max rounded-md"
              type="submit"
            >
              {restProps.type === "add" ? "Login" : "Register"}
            </Button>
            <span
              className="text-sm text-gray-500 cursor-pointer"
              onClick={() => {
                if (restProps.type === "add") {
                  window.location.href = "/register";
                } else {
                  window.location.href = "/login";
                }
              }}
            >
              {restProps.type === "add"
                ? "Don't have an account? Click here to register"
                : "Already have an account? Click here to login"}
            </span>
          </form>
        </div>
      </div>
    </section>
  );
}

export const AuthenticationComponent = React.memo(Component);
