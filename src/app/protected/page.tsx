"use client";

import { IoIosWarning } from "react-icons/io";

export default function ProtectedPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-40">
      <IoIosWarning size={144} className="text-yellow-400" />
      <p className="text-3xl font-bold">접근 불가한 페이지 입니다.</p>
    </div>
  );
}
