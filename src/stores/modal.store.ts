import { create } from "zustand";

interface ModalState {
  modals: { [key: string]: boolean };
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modals: {},
  openModal: (modalName) => set((state) => ({ modals: { ...state.modals, [modalName]: true } })),
  closeModal: (modalName) => set((state) => ({ modals: { ...state.modals, [modalName]: false } })),
}));
