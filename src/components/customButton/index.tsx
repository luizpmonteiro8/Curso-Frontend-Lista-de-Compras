import React from "react";
import { Button } from "./styles";

interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void;
  marginRight?: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  color?: "primary" | "secondary";
}

export const CustomButton = ({
  children,
  color = "primary",
  disabled = false,
  marginRight = false,
  onClick,
  ...restProps
}: CustomButtonProps) => {
  return (
    <Button
      style={{ marginRight: marginRight ? "10px" : "0" }}
      onClick={onClick}
      disabled={disabled}
      $buttonColor={color}
      {...restProps}
    >
      {children}
    </Button>
  );
};
