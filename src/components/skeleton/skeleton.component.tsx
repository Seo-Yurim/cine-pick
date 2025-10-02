export function SkeletonComponent({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-text-bg shadow-lg ${className}`} />;
}
