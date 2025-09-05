"use client";

import { Button, ButtonProps } from "react-aria-components";
import "./button.component.scss";

export default function ButtonComponent({ children }: ButtonProps) {
  return <Button>{children}</Button>;
}
