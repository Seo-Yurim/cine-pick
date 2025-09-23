"use client";

import { getCheckUsername } from "@/services/users.service";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { ButtonComponent, FormComponent, InputComponent } from "@/components";
import useSignupValidation from "@/hooks/useSignupValidation";
import { usePostUser } from "@/queries/user.query";

export default function SignupPage() {
  const { values, errors, setErrors, handleChange, validate } = useSignupValidation({
    name: "",
    username: "",
    password: "",
    checkPassword: "",
  });

  const signup = usePostUser();
  const handleSignup = async () => {
    if (!validate()) {
      toast.error("정해진 규칙에 맞게 작성해주세요!");
      return;
    }

    const isUsernameCheck = await getCheckUsername(values.username);
    if (!isUsernameCheck) {
      setErrors({ username: "이미 사용중인 아이디입니다!" });
      return;
    }

    signup.mutate({
      name: values.name,
      username: values.username,
      password: values.password,
    });
  };

  return (
    <section className="mx-auto flex max-w-[500px] flex-col items-center gap-8 py-24">
      <Link href={"/"} className="relative h-[100px] w-[412px]">
        <Image
          src="/logo.svg"
          fill
          priority
          className="absolute w-full object-contain"
          alt="로고"
          sizes="412px"
        />
      </Link>

      <FormComponent>
        <InputComponent
          name="name"
          type="text"
          placeholder="이름을 입력해주세요."
          value={values.name}
          onInputChange={handleChange}
          label="이름"
          errorMessage={errors.name}
        />
        <InputComponent
          name="username"
          type="text"
          placeholder="아이디를 입력해주세요."
          value={values.username}
          onInputChange={handleChange}
          label="아이디"
          errorMessage={errors.username}
        />
        <InputComponent
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={values.password}
          onInputChange={handleChange}
          label="비밀번호"
          errorMessage={errors.password}
        />
        <InputComponent
          name="checkPassword"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
          value={values.checkPassword}
          onInputChange={handleChange}
          label="비밀번호 확인"
          errorMessage={errors.checkPassword}
        />
        <ButtonComponent
          onClick={handleSignup}
          className="w-full rounded-xl bg-point-color p-4 text-lg font-medium"
        >
          회원가입
        </ButtonComponent>
      </FormComponent>

      <div className="flex w-full items-center justify-between">
        <p className="font-medium">이미 회원이신가요?</p>
        <Link href="/login">
          <ButtonComponent>로그인</ButtonComponent>
        </Link>
      </div>
    </section>
  );
}
