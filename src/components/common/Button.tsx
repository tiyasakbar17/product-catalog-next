import { ButtonHTMLAttributes, useMemo } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg" | "custom";
  buttonType?: "primary" | "secondary" | "custom";
  textColor?: "white" | "black" | string;
}

export function Button({
  size,
  className,
  children,
  buttonType,
  textColor,
  ...rest
}: Props) {
  const classSize = useMemo(() => {
    switch (size) {
      case "custom":
        return "";
      case "md":
        return "px-4 py-[10.5px]";
      case "lg":
        return "px-5 py-4";
      default:
        return "px-[10px] py-[7px]";
    }
  }, [size]);

  const classBg = useMemo(() => {
    switch (buttonType) {
      case "primary":
        return "bg-gradient-to-t from-blue-500 to-blue-600";
      case "secondary":
        return "border border-gray-300 bg-white";
      default:
        return "";
    }
  }, [buttonType]);

  const classText = useMemo(() => {
    switch (true) {
      case textColor !== "white" &&
        textColor !== "black" &&
        textColor !== undefined:
        return "";
      case textColor === "black":
        return "text-[#1c1c1c]";
      case textColor === undefined && buttonType === "primary":
        return "text-white";
      default:
        return "text-[#0D6EFD]";
    }
  }, [textColor]);
  return (
    <button
      className={`${classBg} ${classSize} ${classText} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}
