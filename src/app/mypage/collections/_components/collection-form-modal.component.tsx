import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CollectionList } from "@/types/collections.type";
import { usePatchCollection, usePostCollection } from "@/queries/collections.query";
import { ButtonComponent, ModalComponent } from "@/components";
import { InputComponent } from "@/components/input/input.component";

interface CollectionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  defaultValue: CollectionList | null;
}

export function CollectionFormModal({
  isOpen,
  onClose,
  userId,
  defaultValue,
}: CollectionFormModalProps) {
  const [collectionFormData, setCollectionFormData] = useState<Omit<CollectionList, "id">>({
    title: "",
    description: "",
    userId: userId,
    movies: [],
  });

  useEffect(() => {
    if (defaultValue) {
      setCollectionFormData({
        title: defaultValue.title || "",
        description: defaultValue.description || "",
        userId: defaultValue.userId || userId,
        movies: defaultValue.movies || [],
      });
    } else {
      setCollectionFormData({
        title: "",
        description: "",
        userId: userId,
        movies: [],
      });
    }
  }, [defaultValue, userId]);

  const addCollection = usePostCollection();
  const editCollection = usePatchCollection();

  const handleSubmit = () => {
    if (collectionFormData.title.trim() == "" || collectionFormData.description.trim() == "") {
      toast.error("내용을 전부 입력해주세요!");
      return;
    }

    if (defaultValue) {
      editCollection.mutate(
        {
          collectionId: defaultValue.id ?? "",
          collectionData: {
            title: collectionFormData.title,
            description: collectionFormData.description,
            userId,
          },
        },
        {
          onSuccess: () => {
            onClose();

            setCollectionFormData({
              title: "",
              description: "",
              userId: "",
              movies: [],
            });
          },
        },
      );
    } else {
      addCollection.mutate(
        {
          title: collectionFormData.title,
          description: collectionFormData.description,
          userId,
          movies: [],
        },
        {
          onSuccess: () => {
            onClose();

            setCollectionFormData({
              title: "",
              description: "",
              userId: "",
              movies: [],
            });
          },
        },
      );
    }
  };

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold"> {defaultValue ? "컬렉션 수정" : "컬렉션 추가"}</h2>
      <InputComponent
        name="title"
        type="text"
        placeholder="컬렉션 이름을 작성해주세요."
        value={collectionFormData.title}
        onInputChange={(e) => setCollectionFormData((prev) => ({ ...prev, title: e.target.value }))}
        label="컬렉션 이름"
      />
      <InputComponent
        name="cdescription"
        type="text"
        placeholder="컬렉션 설명을 작성해주세요."
        value={collectionFormData.description}
        onInputChange={(e) =>
          setCollectionFormData((prev) => ({ ...prev, description: e.target.value }))
        }
        label="컬렉션 설명"
      />
      <ButtonComponent
        className="rounded-xl bg-point-color text-white hover:bg-point-color/80"
        onClick={handleSubmit}
      >
        {defaultValue ? "컬렉션 수정하기" : "컬렉션 추가하기"}
      </ButtonComponent>
    </ModalComponent>
  );
}
