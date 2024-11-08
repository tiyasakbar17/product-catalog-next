"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../common/Button";
import { useGeneralContext } from "@/context/generalContext";
import { useRef } from "react";

type Props = {};

export function Header({}: Props) {
  const searchRef = useRef<HTMLInputElement>(null);
  const { setSearch, userData } = useGeneralContext();

  function handleSearch() {
    if (searchRef.current) {
      setSearch(searchRef.current.value);
    }
  }

  return (
    <header className="w-full bg-white">
      <div className="w-full h-[86px] border-0 md:border-b md:border-[#E0E0E0] px-5 md:px-7">
        <div className="max-w-[1180px] h-full mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-5 md:gap-0">
            <Link href="/">
              <div className="h-[46px] flex gap-2 items-center cursor-pointer">
                <Image
                  src="/icons/logo.svg"
                  alt="Logo"
                  className="h-full"
                  height={46}
                  width={46}
                />
                <span className="text-[#8CB7F5] text-3xl font-bold">Brand</span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex bg-white border-2 border-[#0D6EFD] rounded-md h-[40px] items-center flex-1 max-w-[665px] overflow-hidden">
            <input
              type="text"
              className="h-full min-w-0 flex-1 border-r border-[#0D6EFD] p-2 focus-visible:outline-none"
              placeholder="Search"
              ref={searchRef}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              title="Search"
              className="min-w-[98px] h-full !px-6"
              buttonType="primary"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>

          {!userData.fullName ? (
            <Button
              title="Login"
              buttonType="primary"
              className="rounded-md px-8"
              onClick={() => {
                window.location.href = "/login";
              }}
            >
              {" "}
              Login{" "}
            </Button>
          ) : (
            <div className="h-[80px] w-[80px] md:w-[220px] pt-1 -mb-1 flex items-center justify-center gap-4">
              <div
                className="flex text-gray-500 flex-col justify-between items-center cursor-pointer"
                onClick={() => (window.location.href = "/manage")}
              >
                <i className="fa-solid fa-gear text-lg"></i>
                <span className="text-gray-500 text-xs">Manage</span>
              </div>
              <div className="flex text-gray-500 flex-col justify-between items-center cursor-pointer">
                <i className="fa-solid fa-user text-lg"></i>
                <span className="text-gray-500 text-xs">
                  {userData.fullName.split(" ")[0]}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
