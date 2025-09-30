import "./tooltip.component.scss";

type TooltipProps = {
  text: string;
  bgColor: string;
  children: React.ReactNode;
};

export function TooltipComponent({ text, bgColor, children }: TooltipProps) {
  return (
    <div className="simple-tooltip">
      {children}
      <span
        className="tooltip-text"
        style={{
          backgroundColor: bgColor,
          ["--tooltip-color" as any]: bgColor,
        }}
      >
        {text}
      </span>
    </div>
  );
}
