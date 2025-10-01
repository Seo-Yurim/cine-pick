import { ReactNode } from "react";
import { ButtonComponent } from "@/components";
import "./slider-section.component.scss";

interface SliderSectionProps {
  title: string;
  children: ReactNode;
  isLoading?: boolean;
  bgColor?: string;
  btnText?: string;
  onButtonClick?: () => void;
  controls?: ReactNode;
}

export function SliderSection({
  title,
  children,
  isLoading = false,
  bgColor,
  btnText = "",
  onButtonClick,
  controls,
}: SliderSectionProps) {
  return (
    <section style={{ backgroundColor: bgColor }} className="slider-section">
      <div className="slider-section__header">
        <h2 className="slider-section__title">{title}</h2>
        <div className="w-full border-b" />
        <div className="slider-section__controls">
          {controls}
          {btnText && <ButtonComponent onClick={onButtonClick}>{btnText}</ButtonComponent>}
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-4 gap-4 p-2">
          {[...Array(4)].map((_, idx) => (
            <div
              key={idx}
              className="flex aspect-[3/4] h-full w-full min-w-[200px] max-w-[412px] animate-pulse flex-col gap-4 rounded-xl bg-text-bg p-4 shadow-lg"
            />
          ))}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
