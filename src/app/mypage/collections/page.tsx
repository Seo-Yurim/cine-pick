"use client";

import { CollectionData } from "@/services/collection.service";
import { useAuthStore } from "@/stores/auth.store";
import { useModalStore } from "@/stores/modal.store";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { MovieCollectionItem } from "@/types/movie.type";
import { ButtonComponent, LoadingComponent } from "@/components";
import { useCollectionList } from "@/queries/account.query";
import { usePostCollection } from "@/queries/collection.query";
import { CollectionFormModal } from "./components/collection-form-modal.component";

export default function MyCollectionPage() {
  const { sessionId, accountId } = useAuthStore();
  if (!sessionId || !accountId) return null;

  const { modals, openModal, closeModal } = useModalStore();

  const [collectionFormData, setCollectionFormData] = useState<CollectionData>({
    name: "",
    description: "",
  });

  const addCollection = usePostCollection();

  const handleSubmit = () => {
    if (collectionFormData.name.trim() == "" || collectionFormData.description.trim() == "") {
      toast.error("내용을 전부 입력해주세요!");
      return;
    }

    const collectionData = {
      name: collectionFormData.name,
      description: collectionFormData.description,
    };

    addCollection.mutate({ sessionId, collection: collectionData });
  };

  const { data, isLoading, isError } = useCollectionList(accountId);

  if (isLoading) return <LoadingComponent label="로딩 중 ... " isIndeterminate />;
  if (isError) {
    toast.error("데이터를 불러오는 중 오류가 발생하였습니다!");
    return;
  }

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">내 컬렉션 목록</h1>
        <ButtonComponent onClick={() => openModal("collectionForm")}>폴더추가</ButtonComponent>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.results.map((item: MovieCollectionItem) => (
          <Link
            key={item.id}
            href={`/mypage/collections/${item.id}`}
            className="flex h-8 items-center justify-center rounded-xl bg-point-color/50 p-16"
          >
            <p className="text-lg font-semibold">{item.name}</p>
          </Link>
        ))}
      </div>

      <CollectionFormModal
        isOpen={modals.collectionForm}
        onClose={() => closeModal("collectionForm")}
        onSubmit={handleSubmit}
        collectionFormData={collectionFormData}
        setCollectionFormData={setCollectionFormData}
      />
    </main>
  );
}
