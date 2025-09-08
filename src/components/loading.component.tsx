import { Label, ProgressBar, ProgressBarProps } from "react-aria-components";

interface MyProgressBarProps extends ProgressBarProps {
  label?: string;
}

export default function LoadingComponent({ label, ...props }: MyProgressBarProps) {
  return (
    <ProgressBar
      className="mx-auto flex h-screen w-full max-w-96 flex-col items-center gap-8 py-96"
      {...props}
    >
      {({ percentage, valueText, isIndeterminate }) => (
        <>
          {isIndeterminate ? (
            <div className="relative h-4 w-full overflow-hidden rounded-full bg-foreground">
              <div className="animate-slide absolute h-full w-1/3 rounded-full bg-point-color" />
            </div>
          ) : (
            <>
              <span className="text-lg font-semibold">{valueText}</span>
              <div className="h-4 w-full overflow-hidden rounded-full bg-foreground">
                <div
                  className="h-full rounded-full bg-point-color transition-all duration-300"
                  style={{ width: percentage + "%" }}
                />
              </div>
            </>
          )}
          <Label className="text-xl font-semibold">{label}</Label>
        </>
      )}
    </ProgressBar>
  );
}
