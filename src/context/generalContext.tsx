"use client";;
import { createContext, useContext, useState } from "react";

interface GeneralContextType {
  userData: any;
  setUserData: any;
  search: string;
  setSearch: any;
}

const GeneralContext = createContext({} as GeneralContextType);

export const useGeneralContext = () => {
  return useContext(GeneralContext);
};

export const GeneralProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState({});
  const [search, setSearch] = useState("");

  return (
    <GeneralContext.Provider
      value={{ userData, setUserData, search, setSearch }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
