"use client";

import { Button, ButtonProps } from "react-aria-components";
import styles from "./button.component.module.scss";

export function ButtonComponent({ children, ...props }: ButtonProps) {
  return (
    <Button className={styles.button} {...props}>
      {children}
    </Button>
  );
}
