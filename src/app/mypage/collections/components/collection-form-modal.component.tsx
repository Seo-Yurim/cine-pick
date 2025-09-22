import { CollectionData } from "@/services/collection.service";
import { ButtonComponent, ModalComponent } from "@/components";
import { InputComponent } from "@/components/input/input.component";

interface CollectionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  collectionFormData: CollectionData;
  setCollectionFormData: React.Dispatch<React.SetStateAction<CollectionData>>;
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
        name="collection-name"
        type="text"
        placeholder="컬렉션 이름을 작성해주세요."
        value={collectionFormData.name}
        onChange={(value) => setCollectionFormData((prev) => ({ ...prev, name: value }))}
        label="컬렉션 이름"
      />
      <InputComponent
        name="collection-description"
        type="text"
        placeholder="컬렉션 설명을 작성해주세요."
        value={collectionFormData.description}
        onChange={(value) => setCollectionFormData((prev) => ({ ...prev, description: value }))}
        label="컬렉션 설명"
      />
      <ButtonComponent className="text-point-color" onClick={onSubmit}>
        컬렉션 추가하기
      </ButtonComponent>
    </ModalComponent>
  );
}
