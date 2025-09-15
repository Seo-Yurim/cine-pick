import { ReactNode } from "react";
import { Dialog, Heading, Modal } from "react-aria-components";
import { ImCancelCircle } from "react-icons/im";
import "./modal.component.scss";

interface ModalProps {
  children: ReactNode;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ModalComponent({ children, title, isOpen, onClose, ...props }: ModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Dialog {...props} className="flex w-[90vw] max-w-xl flex-col gap-4 rounded-md bg-white p-8">
        <div className="flex items-center justify-between gap-4">
          {title && (
            <Heading slot="title" className="text-xl font-bold text-background">
              {title}
            </Heading>
          )}
          <ImCancelCircle
            onClick={onClose}
            className="ml-auto h-8 w-8 cursor-pointer text-background"
          />
        </div>
        <div className="flex flex-col items-center gap-4">{children}</div>
      </Dialog>
    </Modal>
  );
}
