"use client";

import { Form, FormProps } from "react-aria-components";
import "./form.component.scss";

export function FormComponent({ children, ...props }: FormProps) {
  return <Form {...props}>{children}</Form>;
}
