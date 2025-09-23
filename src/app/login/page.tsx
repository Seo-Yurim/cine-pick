"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { User } from "@/types/user.type";
import { ButtonComponent, FormComponent, InputComponent } from "@/components";
import { useGetLogin } from "@/queries/user.query";

export default function LoginPage() {
  const [form, setForm] = useState<Pick<User, "username" | "password">>({
    username: "",
    password: "",
  });

  const getLogin = useGetLogin();
  const handleLogin = () => {
    getLogin.mutate({ username: form.username, password: form.password });
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
        <ButtonComponent onClick={handleLogin} className="w-full rounded-xl bg-point-color p-4">
          로그인
        </ButtonComponent>
      </FormComponent>

      <div className="flex w-full items-center justify-between">
        <p className="text-lg font-medium">아직 회원이 아니신가요?</p>
        <ButtonComponent>회원가입</ButtonComponent>
      </div>
    </section>
  );
}
