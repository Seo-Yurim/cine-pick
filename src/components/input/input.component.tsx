"use client";

import { useState } from "react";
import { FieldError, Input, Label, TextField, TextFieldProps } from "react-aria-components";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { LuMessageSquareWarning } from "react-icons/lu";
import "./input.component.scss";

interface InputProps extends TextFieldProps {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  errorMessage?: string;
}

export function InputComponent({
  name,
  type,
  placeholder,
  value,
  onInputChange,
  label,
  errorMessage,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <TextField {...props}>
      <Label>{label}</Label>

      <div className="relative">
        <Input
          name={name}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onInputChange}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="eye-icon"
            aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
          >
            {showPassword ? <IoEye /> : <IoEyeOff />}
          </button>
        )}
      </div>

      {errorMessage && (
        <div className="error">
          <LuMessageSquareWarning size={24} />
          <p>{errorMessage}</p>
        </div>
      )}
    </TextField>
  );
}
