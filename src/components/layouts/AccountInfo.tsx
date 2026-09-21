"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/classNames";
import { IoChevronDown } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { useUser } from "@/components/providers/UserProvider";
import { useMailboxCounts } from "@/hooks/useMailboxCounts";
import { clearAllAuthData } from "@/utils/auth";
import { toast } from "sonner";

function MailboxIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      stroke="currentColor"
      strokeWidth={1.5}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
      />
    </svg>
  );
}

function LoggedInView() {
  const router = useRouter();
  const { currentUser, refetchUserInfo, setCurrentUser } = useUser();
  const { totalUnread } = useMailboxCounts();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const user = currentUser?.result?.user;
  const nickname = user?.nickName || user?.userName || "사용자";
  const money = user?.balanceMoney || 0;
  const points = user?.balancePoint || 0;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    clearAllAuthData();
    setCurrentUser(undefined);
    setIsOpen(false);
    toast.success("로그아웃되었습니다.");
    router.push("/");
  };

  const handleRefresh = async () => {
    try {
      await refetchUserInfo();
      toast.success("잔액이 새로고침되었습니다.");
    } catch {
      toast.error("새로고침 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-white"
        aria-expanded={isOpen}
        aria-haspopup="menu"
      >
        <Image
          src="/images/user_ico.svg"
          alt=""
          width={32}
          height={32}
          className="size-8 object-contain"
        />
        <span className="max-w-28 truncate">{nickname}</span>
        <IoChevronDown
          className={cn(
            "size-3.5 text-white/70 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute top-full right-0 z-60 mt-2 min-w-56 rounded-md border border-[#2a2a2a] bg-[#11141d] py-2 text-left shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
        >
          <Link
            href="/messages"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between gap-3 px-4 py-2 text-left text-sm text-[#d4af37] transition-colors hover:bg-white/5 hover:text-[#f7e8a8]"
          >
            <span className="inline-flex items-center gap-2">
              <MailboxIcon className="size-4.5 shrink-0 text-[#e6c34d]" />
              쪽지함
            </span>
            <span
              className={cn(
                "tabular-nums font-bold",
                totalUnread > 0 ? "text-red-500" : "text-[#9ca3af]",
              )}
            >
              {totalUnread > 99 ? "99+" : totalUnread}
            </span>
          </Link>

          <div className="flex items-center justify-between gap-3 px-4 py-2 text-left text-sm text-gray">
            <span>
              머니{" "}
              <strong className="font-bold text-[#47fd0e]">
                {money.toLocaleString()}원
              </strong>
            </span>
            <button
              type="button"
              onClick={handleRefresh}
              className="cursor-pointer text-gray transition-colors hover:text-white"
              aria-label="잔액 새로고침"
            >
              <TfiReload className="size-4" />
            </button>
          </div>

          <div className="flex items-center justify-between gap-3 px-4 py-2 text-left text-sm text-gray">
            <span>포인트</span>
            <strong className="font-bold text-[#47fd0e]">
              {points.toLocaleString()}P
            </strong>
          </div>

          <Link
            href="/voucher"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-left text-sm text-gray transition-colors hover:bg-white/5 hover:text-white"
          >
            쿠폰
          </Link>
          <Link
            href="/my-page"
            role="menuitem"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2 text-left text-sm text-gray transition-colors hover:bg-white/5 hover:text-white"
          >
            마이페이지
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="block w-full cursor-pointer px-4 py-2 text-left text-sm text-gray transition-colors hover:bg-white/5 hover:text-white"
          >
            로그아웃
          </button>
        </div>
      )}
    </div>
  );
}

function LoggedOutView({
  onOpenLogin,
  onOpenSignUp,
}: {
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
}) {
  return (
    <div className="flex items-center gap-3 text-sm font-semibold">
      <button
        type="button"
        onClick={onOpenLogin}
        className="cursor-pointer text-gray transition-colors hover:text-white"
      >
        로그인
      </button>
      <button
        type="button"
        onClick={onOpenSignUp}
        className="cursor-pointer rounded-full bg-linear-to-b from-[#f7e8a8] via-[#e6c34d] to-[#c9a227] px-4 py-1.5 text-[#1a1208] shadow-[0_0_12px_#e6c34d,0_0_24px_rgba(230,195,77,0.45)] transition-[opacity,box-shadow] hover:opacity-90 hover:shadow-[0_0_16px_#f7e8a8,0_0_32px_rgba(230,195,77,0.65)]"
      >
        회원가입
      </button>
    </div>
  );
}

const AccountInfo = () => {
  const { openLogin, openSignUp } = useAuthModal();
  const { currentUser, loadingUser } = useUser();

  const isLoggedIn = !!currentUser?.result?.token;

  if (loadingUser) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
        로딩 중...
      </div>
    );
  }

  if (isLoggedIn) {
    return <LoggedInView />;
  }

  return (
    <LoggedOutView onOpenLogin={openLogin} onOpenSignUp={openSignUp} />
  );
};

export default AccountInfo;
