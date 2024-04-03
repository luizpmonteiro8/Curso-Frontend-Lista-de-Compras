import { CheckboxContainer, CheckboxInput, CheckboxLabel } from "./styles";

interface CustomCheckboxProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  disabled?: boolean;
}

const CustomCheckbox = ({
  checked,
  onChange,
  label,
  disabled,
}: CustomCheckboxProps) => {
  return (
    <CheckboxContainer>
      <CheckboxInput
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <CheckboxLabel>{label}</CheckboxLabel>
    </CheckboxContainer>
  );
};

export default CustomCheckbox;
