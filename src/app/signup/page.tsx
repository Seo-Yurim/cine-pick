"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { User } from "@/types/user.type";
import { ButtonComponent, FormComponent, InputComponent } from "@/components";
import { usePostUser } from "@/queries/user.query";

export default function SignupPage() {
  const [form, setForm] = useState<Omit<User, "id">>({
    name: "",
    username: "",
    password: "",
  });

  const signup = usePostUser();
  const handleSignup = () => {
    const userData = {
      name: form.name,
      username: form.username,
      password: form.password,
    };

    signup.mutate(userData);
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
        />
      </Link>

      <FormComponent>
        <InputComponent
          name="name"
          type="name"
          placeholder="이름을 입력해주세요."
          value={form.name}
          onChange={(value) => setForm((prev) => ({ ...prev, name: value }))}
          label="이름"
        />
        <InputComponent
          name="username"
          type="username"
          placeholder="아이디를 입력해주세요."
          value={form.username}
          onChange={(value) => setForm((prev) => ({ ...prev, username: value }))}
          label="아이디"
        />
        <InputComponent
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={form.password}
          onChange={(value) => setForm((prev) => ({ ...prev, password: value }))}
          label="비밀번호"
        />
        <ButtonComponent
          onClick={handleSignup}
          className="w-full rounded-xl bg-point-color p-4 text-lg font-medium"
        >
          회원가입
        </ButtonComponent>
      </FormComponent>

      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-medium">이미 회원이신가요?</p>
        <Link href="/login">
          <ButtonComponent>로그인</ButtonComponent>
        </Link>
      </div>
    </section>
  );
}
