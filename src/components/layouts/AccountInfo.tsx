"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/classNames";
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

  const user = currentUser?.result?.user;
  const nickname = user?.nickName || user?.userName || "사용자";
  const money = user?.balanceMoney || 0;
  const points = user?.balancePoint || 0;

  const handleLogout = () => {
    clearAllAuthData();
    setCurrentUser(undefined);
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
    <div className="flex gap-5 items-center text-sm leading-7.5 font-semibold">
      <span className="text-gray">{nickname}</span>
      <Link
        href="/messages"
        className={cn(
          "flex items-center gap-1 text-sm transition-all duration-300",
          "text-[#d4af37] hover:text-[#f7e8a8]",
        )}
        title="쪽지함"
      >
        <MailboxIcon className="size-4.5 shrink-0 text-[#e6c34d]" />
        <span className="whitespace-nowrap font-semibold tracking-tight max-md:hidden">
          쪽지함
        </span>
        <span className="text-white/70">:</span>
        <span
          className={cn(
            "min-w-[1ch] tabular-nums font-bold",
            totalUnread > 0
              ? "text-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.55)]"
              : "text-[#9ca3af]",
          )}
        >
          {totalUnread > 99 ? "99+" : totalUnread}
        </span>
      </Link>
      <button
        onClick={handleLogout}
        className="text-gray text-glow transition-all duration-300 cursor-pointer"
      >
        로그아웃
      </button>
      <div className="flex gap-2 items-center">
        <span className="text-gray">
          머니{" "}
          <strong className="text-[#47fd0e] font-bold">
            {money.toLocaleString()}원
          </strong>
        </span>
        <button
          onClick={handleRefresh}
          className="text-gray transition-all duration-300 cursor-pointer"
        >
          <TfiReload className="size-5 font-bold text-gray" />
        </button>
      </div>

      <span className="text-gray">
        포인트{" "}
        <strong className="text-[#47fd0e] font-bold">
          {points.toLocaleString()}P
        </strong>
      </span>
      <Link href="/voucher" className="text-gray text-glow transition-all duration-300">
        쿠폰
      </Link>
      <Link href="/my-page" className="text-gray text-glow transition-all duration-300">
        마이페이지
      </Link>
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
    <div className="flex text-sm items-center font-semibold gap-4">
      <button
        type="button"
        onClick={onOpenLogin}
        className={cn(
          "text-gray hover:text-[#ef7c00] transition-all duration-300 cursor-pointer"
        )}
      >
        로그인
      </button>
      <button
        type="button"
        onClick={onOpenSignUp}
        className={cn(
          "text-gray hover:text-[#ef7c00] transition-all duration-300 cursor-pointer"
        )}
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
      <div className="absolute right-5 top-3.75">
        <div className="flex items-center gap-2 text-sm text-gray">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
          로딩 중...
        </div>
      </div>
    );
  }

  return (
    <div className="absolute right-5 top-3.75">
      {isLoggedIn ? (
        <LoggedInView />
      ) : (
        <LoggedOutView
          onOpenLogin={openLogin}
          onOpenSignUp={openSignUp}
        />
      )}
    </div>
  );
};

export default AccountInfo;
