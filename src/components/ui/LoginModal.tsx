"use client";

import { createPortal } from "react-dom";
import Image from "next/image";
import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/classNames";
import { Button } from "@/components/ui/Button";
import { saveStorageKey } from "@/utils/storage";
import { getStorageKey as getStorageKeyName } from "@/constants/store-key";
import { useUser } from "@/components/providers/UserProvider";
import { toast } from "sonner";
import {
  isMobileDevice,
  normalizeLoginUserIdCaseInsensitive,
} from "@/utils/loginUserId";
import { isMemberSiteBlockedAgentRole } from "@/utils/auth";
import { demoSignIn } from "@/app/actions/demo-auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSignUp?: () => void;
}

export function LoginModal({ isOpen, onClose, onOpenSignUp }: LoginModalProps) {
  const { setCurrentUser } = useUser();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      setUserName("");
      setPassword("");
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userName || !password) {
      toast.error("아이디와 비밀번호를 입력하세요.");
      return;
    }

    setIsLoading(true);

    try {
      const userNameForAuth = isMobileDevice()
        ? normalizeLoginUserIdCaseInsensitive(userName)
        : userName;
      const response = await demoSignIn(userNameForAuth, password);

      if (response.success && response.result?.token) {
        if (isMemberSiteBlockedAgentRole(response.result.user?.role)) {
          toast.error("에이전트 계정은 회원 사이트에 로그인할 수 없습니다.");
          return;
        }

        saveStorageKey({
          key: getStorageKeyName(),
          data: JSON.stringify(response),
        });
        setCurrentUser(response);
        toast.success("로그인 성공!");
        onClose();
        setUserName("");
        setPassword("");
        router.push("/game_casino");
      } else {
        toast.error(response.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-modal-title"
    >
      <div
        className={cn(
          "relative w-full max-w-150 overflow-hidden rounded-2xl shadow-2xl border border-[#313742]",
          "bg-[url('/images/popup_login_bg.jpg')] bg-cover bg-center"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <Button
          variant="transparent"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-[#111111] border-[#29324b] text-white/80 transition-colors hover:bg-[#222222] hover:text-white"
          aria-label="Đóng"
        >
          <span className="text-base font-bold leading-none">×</span>
        </Button>

        {/* Content layout: left = image area, right = form */}
        <div className="relative flex min-h-100 md:min-h-100 flex-col px-8 py-4 md:pl-4 md:py-6">
          {/* Left: background image area (soccer player) - empty, image is in bg */}
          {/* Right: form overlay on dark area */}
          <div className="flex justify-center items-center gap-2 mb-5">
            <Image
              src="/images/logo/ksky.png"
              alt="KSKY SOLUTION"
              width={400}
              height={200}
              className="h-20 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            {/* Form */}
            <form
              id="login-form"
              className="flex flex-col gap-2 w-full"
              onSubmit={handleLogin}
            >
              {/* 아이디 */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <label
                  htmlFor="login-id"
                  className="w-[40%] text-center shrink-0 text-base font-bold text-white"
                >
                  아이디
                </label>
                <input
                  id="login-id"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className={cn(
                    "flex-1 rounded-md border border-[#3a3a3a] bg-[#2a2a2a] px-4 py-3",
                    "text-white placeholder:text-white/50 h-14",
                    "focus:outline-none"
                  )}
                  autoComplete="username"
                  disabled={isLoading}
                />
              </div>

              {/* 비밀번호 */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                <label
                  htmlFor="login-password"
                  className="w-[40%] text-center shrink-0 text-base font-bold text-white"
                >
                  비밀번호
                </label>
                <input
                  id="login-password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={cn(
                    "flex-1 rounded-md border border-[#3a3a3a] bg-[#2a2a2a] px-4 py-3",
                    "text-white placeholder:text-white/50 h-14",
                    "focus:outline-none"
                  )}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
              </div>


              <div className="flex justify-center items-center gap-2 sm:gap-4">
                <div className="w-[40%]" />
                {/* Buttons */}
                <div className="mt-2 flex-1 flex flex-col gap-2">
                  <Button
                    type="submit"
                    variant="darkBlueGlow"
                    size="lg"
                    className="rounded-md h-14"
                    fullWidth
                    disabled={isLoading}
                  >
                    {isLoading ? "로그인 중...." : "로그인"}
                  </Button>
                  <Button
                    type="button"
                    variant="darkBlueGlow"
                    size="lg"
                    className="rounded-md h-14"
                    fullWidth
                    onClick={() => {
                      onClose();
                      onOpenSignUp?.();
                    }}
                  >
                    회원가입
                  </Button>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
