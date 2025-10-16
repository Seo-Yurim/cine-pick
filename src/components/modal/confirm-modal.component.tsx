import { RiErrorWarningFill } from "react-icons/ri";
import { ButtonComponent } from "../button/button.component";
import { ModalComponent } from "./modal.component";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export function ConfirmModalComponent({ isOpen, onClose, onDelete }: ConfirmModalProps) {
  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center gap-6">
        <RiErrorWarningFill size={64} className="text-rose-700" />
        <p className="text-xl font-bold">삭제하시겠습니까?</p>
        <div className="flex w-full items-center gap-4 text-white">
          <ButtonComponent onClick={onDelete} className="flex-1 rounded-xl bg-rose-700">
            예
          </ButtonComponent>
          <ButtonComponent onClick={onClose} className="flex-1 rounded-xl bg-zinc-700">
            아니오
          </ButtonComponent>
        </div>
      </div>
    </ModalComponent>
  );
}
