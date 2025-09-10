"use client";

import { Button, ButtonProps } from "react-aria-components";
import "./button.component.scss";

export function ButtonComponent({ children, ...props }: ButtonProps) {
  return <Button {...props}>{children}</Button>;
}
