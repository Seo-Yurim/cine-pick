"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { User } from "@/types/users.type";
import { useLogin } from "@/queries/users.query";
import { ButtonComponent, InputComponent } from "@/components";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const redirect = redirectParam && redirectParam !== "/signup" ? redirectParam : "/";

  const [form, setForm] = useState<Pick<User, "username" | "password">>({
    username: "",
    password: "",
  });

  const getLogin = useLogin({
    onSuccess: () => {
      router.push(redirect);
    },
  });

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();

    if (!form.username.trim() || !form.password.trim()) {
      toast.error("아이디와 비밀번호를 입력해주세요!");
      return;
    }

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

      <form
        className="flex w-full max-w-[640px] flex-col items-center gap-8"
        onSubmit={handleLogin}
      >
        <InputComponent
          name="username"
          type="username"
          placeholder="아이디를 입력해주세요."
          value={form.username}
          onInputChange={(e) => setForm((prev) => ({ ...prev, username: e.target.value }))}
          label="아이디"
        />
        <InputComponent
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
          value={form.password}
          onInputChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
          label="비밀번호"
        />
        <ButtonComponent
          type="submit"
          className="w-full rounded-xl bg-point-color text-lg font-medium"
        >
          로그인
        </ButtonComponent>
      </form>

      <div className="flex w-full items-center justify-between">
        <p className="font-medium">아직 회원이 아니신가요?</p>
        <Link href="/signup">
          <ButtonComponent btnType="link">회원가입</ButtonComponent>
        </Link>
      </div>
    </section>
  );
}
