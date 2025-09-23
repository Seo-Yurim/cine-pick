import { useState } from "react";

interface InitialValuesProps {
  name: string;
  username: string;
  password: string;
  checkPassword: string;
}

interface Errors {
  name?: string;
  username?: string;
  password?: string;
  checkPassword?: string;
}

export default function useSingupValidation(initialValues: InitialValuesProps) {
  const [values, setValues] = useState<InitialValuesProps>(initialValues);
  const [errors, setErrors] = useState<Errors>({});

  const validate = () => {
    let isValid = true;
    let newError: Errors = {};

    if (!values.name || !values.name.trim()) {
      isValid = false;
      newError.name = "이름을 입력해주세요.";
    }

    if (!values.username || !values.username.trim()) {
      isValid = false;
      newError.username = "아이디를 입력해주세요.";
    }

    if (!values.password || !values.password.trim()) {
      isValid = false;
      newError.password = "비밀번호를 입력해주세요.";
    } else if (values.password.length < 8) {
      isValid = false;
      newError.password = "비밀번호는 8자 이상 입력해주세요.";
    }

    if (!values.checkPassword || !values.checkPassword.trim()) {
      isValid = false;
      newError.checkPassword = "비밀번호를 입력해주세요.";
    } else if (values.password !== values.checkPassword) {
      isValid = false;
      newError.checkPassword = "입력하신 비밀번호와 일치하지 않습니다.";
    }

    setErrors(newError);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    validate,
    handleChange,
  };
}
