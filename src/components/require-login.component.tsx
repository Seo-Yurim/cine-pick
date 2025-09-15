import { useLogin } from "@/hooks/useLogin";
import { ButtonComponent } from "./button/button.component";
import { ModalComponent } from "./modal/modal.component";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginRequiredModalComponent({ isOpen, onClose }: LoginRequiredModalProps) {
  const { handleLogin } = useLogin();

  return (
    <ModalComponent isOpen={isOpen} onClose={onClose}>
      <p className="text-xl font-semibold text-background">로그인이 필요한 서비스입니다.</p>
      <ButtonComponent onClick={handleLogin}>로그인하러가기</ButtonComponent>
    </ModalComponent>
  );
}
