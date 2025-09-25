"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiMenuKebab } from "react-icons/ci";
import { CollectionList } from "@/types/collections.type";
import { useAuthStore } from "@/stores/auth.store";
import { useModalStore } from "@/stores/modal.store";
import { useDeleteCollection, useGetCollectionList } from "@/queries/collections.query";
import { ButtonComponent, LoadingComponent } from "@/components";
import { CollectionFormModal } from "./components/collection-form-modal.component";

export default function MyCollectionPage() {
  const { user } = useAuthStore();
  const userId = user?.id as string;

  const { modals, openModal, closeModal, toggleModal } = useModalStore();
  const [selectedCollection, setSelectedCollection] = useState<CollectionList | null>(null);

  const deleteCollection = useDeleteCollection();

  const {
    data: collectionList,
    isLoading: isCollectionListLoading,
    isError: isCollectionListError,
  } = useGetCollectionList(userId);

  if (!collectionList && isCollectionListLoading)
    return <LoadingComponent label="로딩 중 ... " isIndeterminate />;

  if (isCollectionListError) {
    toast.error("데이터를 불러오는 중 오류가 발생하였습니다!");
    return;
  }

  const handleDeleteCollection = (collection: CollectionList) => {
    deleteCollection.mutate({ collectionId: collection.id });
  };

  return (
    <main className="mx-auto flex w-full max-w-[1920px] flex-col gap-8 px-8 py-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">내 컬렉션 목록</h1>
        <ButtonComponent onClick={() => openModal("collectionForm")}>폴더추가</ButtonComponent>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {collectionList.length > 0 ? (
          collectionList?.map((collection: CollectionList) => (
            <div
              key={collection.id}
              className="relative flex min-h-32 flex-col items-center justify-around gap-4 rounded-xl bg-point-color/50 p-4"
            >
              <div className="relative ml-auto">
                <CiMenuKebab
                  onClick={() => toggleModal(`collectionMenu ${collection.id}`)}
                  className="h-6 w-6 cursor-pointer text-white"
                />
                {modals[`collectionMenu ${collection.id}`] && (
                  <div className="absolute right-0 top-full z-10 mt-2 flex flex-col items-center gap-2 text-nowrap rounded-lg bg-text-bg px-4 py-2">
                    <ButtonComponent
                      onClick={() => {
                        setSelectedCollection(collection);
                        openModal("collectionForm");
                      }}
                    >
                      수정
                    </ButtonComponent>
                    <ButtonComponent onClick={() => handleDeleteCollection(collection)}>
                      삭제
                    </ButtonComponent>
                  </div>
                )}
              </div>

              <Link href={`/mypage/collections/${collection.id}`} className="p-4">
                <p className="text-lg font-semibold">{collection.title}</p>
                <p className="text-lg font-semibold">{collection.description}</p>
              </Link>
            </div>
          ))
        ) : (
          <p>아직 생성된 컬렉션이 없습니다!</p>
        )}
      </div>

      <CollectionFormModal
        isOpen={modals.collectionForm}
        onClose={() => {
          closeModal("collectionForm");
          setSelectedCollection(null);
        }}
        userId={userId}
        defaultValue={selectedCollection}
      />
    </main>
  );
}
