import { ReactNode } from "react";
import { ButtonComponent } from "@/components";
import "./slider-section.component.scss";

interface SliderSectionProps {
  title: string;
  children: ReactNode;
  bgColor?: string;
  btnText?: string;
  onButtonClick?: () => void;
  controls?: ReactNode;
}

export function SliderSection({
  title,
  children,
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
        {(controls || btnText) && (
          <div className="slider-section__controls">
            {controls}
            {btnText && <ButtonComponent onClick={onButtonClick}>{btnText}</ButtonComponent>}
          </div>
        )}
      </div>

      {children}
    </section>
  );
}
