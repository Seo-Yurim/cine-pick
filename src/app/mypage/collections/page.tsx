"use client";

import { ButtonComponent } from "@/components";
import { useAccount, useCollectionList } from "@/queries/account.query";

export default function MyCollectionPage() {
  const { data: accountData } = useAccount();
  const accountId = accountData?.id ?? "";

  const { data, isLoading, isError } = useCollectionList(accountId);

  if (isLoading) return <div>loading</div>;

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">내 컬렉션 목록</h1>
        <ButtonComponent>폴더추가</ButtonComponent>
      </div>

      {data?.results.map((item: any) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </main>
  );
}
