"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#070a0f] px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <span className="text-8xl font-bold text-[#ef7c00]/20">404</span>
        <h1 className="text-2xl font-bold text-gray md:text-3xl">
          페이지를 찾을 수 없습니다
        </h1>
        <p className="max-w-md text-gray/80">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Button
          variant="darkBlueGlow"
          size="lg"
          className="mt-2"
          onClick={() => router.push("/")}
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}