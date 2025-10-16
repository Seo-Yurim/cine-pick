"use client";

import Link from "next/link";
import { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { CollectionList } from "@/types/collections.type";
import { useAuthStore } from "@/stores/auth.store";
import { useModalStore } from "@/stores/modal.store";
import { useDeleteCollection, useGetCollectionList } from "@/queries/collections.query";
import { ButtonComponent } from "@/components";
import { CollectionFormModal } from "./_components/collection-form-modal.component";

export default function MyCollectionPage() {
  const { user } = useAuthStore();
  const userId = user?.id as string;

  const { modals, openModal, closeModal, toggleModal } = useModalStore();
  const [selectedCollection, setSelectedCollection] = useState<CollectionList | null>(null);

  const deleteCollection = useDeleteCollection();

  const { data: collectionList } = useGetCollectionList(userId);

  const handleDeleteCollection = (collection: CollectionList) => {
    deleteCollection.mutate({ collectionId: collection.id });
  };

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">내 컬렉션 목록</h1>
        <ButtonComponent
          className="rounded-xl bg-point-color"
          onClick={() => openModal("collectionForm")}
        >
          폴더추가
        </ButtonComponent>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {collectionList?.length > 0 ? (
          collectionList?.map((collection: CollectionList) => (
            <div
              key={collection.id}
              className="relative flex min-h-32 flex-col items-center justify-around gap-4 rounded-xl bg-point-color/50 p-4 transition-all duration-300 hover:scale-[1.02]"
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
                      className="rounded-xl hover:bg-white/30"
                    >
                      수정
                    </ButtonComponent>
                    <ButtonComponent
                      className="rounded-xl hover:bg-white/30"
                      onClick={() => handleDeleteCollection(collection)}
                    >
                      삭제
                    </ButtonComponent>
                  </div>
                )}
              </div>

              <Link
                href={`/mypage/collections/${collection.id}`}
                className="flex w-full flex-col gap-4 p-4 text-center"
              >
                <p className="text-xl font-semibold">
                  {collection.title} ({collection.movies.length})
                </p>
                <p className="rounded-xl bg-white p-2 text-lg font-semibold text-point-color">
                  {collection.description}
                </p>
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
    </>
  );
}
