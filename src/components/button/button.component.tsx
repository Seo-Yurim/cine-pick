"use client";

import { Button, ButtonProps } from "react-aria-components";
import "./button.component.scss";

export function ButtonComponent({ children }: ButtonProps) {
  return <Button>{children}</Button>;
}
