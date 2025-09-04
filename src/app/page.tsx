import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-screen flex-col gap-16">
      <div className="h-[100px] bg-header-bg">
        <Image src="/logo.svg" width={200} height={80} alt="logo" />
      </div>
      <p className="w-fit bg-text-bg p-4 text-xl">test</p>
    </div>
  );
}
