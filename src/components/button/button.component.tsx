"use client";

import { Button, ButtonProps } from "react-aria-components";
import "./button.component.scss";

interface ButtonComponent extends ButtonProps {
  btnType?: string;
  className?: string;
}

export function ButtonComponent({
  btnType = "default",
  className,
  children,
  ...props
}: ButtonComponent) {
  return (
    <Button className={`button ${btnType === "link" && "link-button"} ${className}`} {...props}>
      {children}
    </Button>
  );
}
