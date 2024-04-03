import { ChangeEvent, HTMLInputTypeAttribute, RefObject } from "react";
import { ErrorMessage, InputField, InputWrapper, Label } from "./styles";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  value: string | number;
  customRef?: RefObject<HTMLInputElement>;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: HTMLInputTypeAttribute | undefined;
  error?: string;
}

export const CustomInput = ({
  name,
  label,
  value,
  customRef,
  onChange,
  placeholder = "",
  type = "text",
  error,
  ...rest
}: InputProps) => {
  return (
    <InputWrapper>
      <Label>{label}</Label>
      <InputField
        name={name}
        type={type}
        value={value}
        ref={customRef}
        onChange={onChange}
        placeholder={placeholder}
        {...rest}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputWrapper>
  );
};
