import { CollectionList } from "@/types/collections.type";
import { ButtonComponent, ModalComponent } from "@/components";
import { InputComponent } from "@/components/input/input.component";

interface CollectionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  collectionFormData: Omit<CollectionList, "id">;
  setCollectionFormData: React.Dispatch<React.SetStateAction<Omit<CollectionList, "id">>>;
}

export function CollectionFormModal({
  isOpen,
  onClose,
  onSubmit,
  collectionFormData,
  setCollectionFormData,
}: CollectionFormModalProps) {
  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold">컬렉션 추가</h2>
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
      <ButtonComponent className="text-point-color" onClick={onSubmit}>
        컬렉션 추가하기
      </ButtonComponent>
    </ModalComponent>
  );
}
