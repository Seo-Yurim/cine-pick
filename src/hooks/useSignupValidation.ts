import { getCheckUsername } from "@/services/users.service";
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

  const validate = async () => {
    let isValid = true;
    let newErrors: Errors = {};

    if (!values.name?.trim()) {
      newErrors.name = "이름을 입력해주세요.";
      isValid = false;
    }

    if (!values.username?.trim()) {
      newErrors.username = "아이디를 입력해주세요.";
      isValid = false;
    } else {
      const isUsernameCheck = await getCheckUsername(values.username);
      if (!isUsernameCheck) {
        newErrors.username = "이미 사용 중인 아이디입니다.";
        isValid = false;
      }
    }

    if (!values.password?.trim()) {
      newErrors.password = "비밀번호를 입력해주세요.";
      isValid = false;
    } else if (values.password.length < 8) {
      newErrors.password = "비밀번호는 8자 이상 입력해주세요.";
      isValid = false;
    }

    if (!values.checkPassword?.trim()) {
      newErrors.checkPassword = "비밀번호를 입력해주세요.";
      isValid = false;
    } else if (values.password !== values.checkPassword) {
      newErrors.checkPassword = "입력하신 비밀번호와 일치하지 않습니다.";
      isValid = false;
    }

    setErrors(newErrors);
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
