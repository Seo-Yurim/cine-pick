"use client";

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
      <Dialog {...(!title ? { "aria-label": "모달" } : {})} {...props}>
        <div className="flex items-center justify-between gap-4">
          {title && <Heading slot="title">{title}</Heading>}
          <ImCancelCircle
            onClick={onClose}
            className="ml-auto h-8 w-8 cursor-pointer text-point-color"
          />
        </div>

        {children}
      </Dialog>
    </Modal>
  );
}
