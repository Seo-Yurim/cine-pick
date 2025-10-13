interface SkeletonBoxProps {
  width?: string;
  height?: string;
  className?: string;
}

export function SkeletonBox({ width = "100%", height = "1rem", className = "" }: SkeletonBoxProps) {
  return (
    <div className={`animate-pulse rounded bg-gray-300 ${className}`} style={{ width, height }} />
  );
}
