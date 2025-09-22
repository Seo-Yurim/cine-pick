import { FieldError, Input, Label, TextField, TextFieldProps } from "react-aria-components";
import "./input.component.scss";

interface InputProps extends TextFieldProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  errorMessage?: string;
}

export function InputComponent({
  name,
  type,
  placeholder,
  value,
  onChange,
  label,
  errorMessage,
  ...props
}: InputProps) {
  return (
    <TextField {...props}>
      <Label>{label}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <FieldError>{errorMessage}</FieldError>
    </TextField>
  );
}
