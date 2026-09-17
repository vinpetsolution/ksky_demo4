"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { cn } from "@/utils/classNames";
import { LazyMotion, domAnimation, motion, AnimatePresence } from "@/lib/motion";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { useUser } from "@/components/providers/UserProvider";
import { Button } from "../ui/Button";
import { TfiReload } from "react-icons/tfi";
import { saveStorageKey } from "@/utils/storage";
import { demoSignIn } from "@/app/actions/demo-auth";
import { getStorageKey as getStorageKeyName } from "@/constants/store-key";
import { clearAllAuthData, isMemberSiteBlockedAgentRole } from "@/utils/auth";
import { toast } from "sonner";
import { useMailboxCounts } from "@/hooks/useMailboxCounts";
import {
  isMobileDevice,
  normalizeLoginUserIdCaseInsensitive,
} from "@/utils/loginUserId";

interface UserSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function UserSidebarContent({ onClose }: { onClose: () => void }) {
  const { openSignUp } = useAuthModal();
  const { currentUser } = useUser();
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);

  const isLoggedIn = !!currentUser?.result?.token;

  useEffect(() => {
    if (prevPathnameRef.current !== null && prevPathnameRef.current !== pathname) {
      onClose();
    }
    prevPathnameRef.current = pathname;
  }, [pathname, onClose]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
      className="fixed inset-0 z-100 w-full bg-[#161616] flex flex-col"
    >
      {/* Header */}
      <div className="w-full h-28.5 leading-28.5 bg-[#161616] border-b border-[#2f2f2f] flex items-center justify-between px-5 shrink-0">
        <Link href="/" onClick={onClose} className="flex items-center">
          <Image
            src="/images/logo/ksky.png"
            alt="KSKY SOLUTION"
            width={120}
            height={37}
            className="h-12.5 w-auto object-cover"
          />
        </Link>
        <Button
          variant="transparent"
          onClick={onClose}
          aria-label="Close menu"
          className="text-[#ffc000] font-bold text-xs uppercase tracking-wide hover:text-[#ffc000] transition-colors"
        >
          CLOSE
        </Button>
      </div>

      {/* Main content */}
      <div className={cn(
        "flex-1 overflow-y-auto",
        isLoggedIn ? "px-0 py-0" : "px-5 py-8"
      )}>
        {isLoggedIn ? (
          <LoggedInContent onClose={onClose} />
        ) : (
          <LoginFormContent
            onSignUp={openSignUp}
            onClose={onClose}
          />
        )}
      </div>
    </motion.div>
  );
}

function LoggedInContent({ onClose }: { onClose: () => void }) {
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
    onClose();
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
    <div className="flex flex-col w-full">
      {/* Top section: content + My Page column */}
      <div className="flex">
        {/* Main content - left */}
        <div className="flex-1 flex flex-col border-r border-[#2f2f2f]">
          {/* Row 1: Greeting + Logout */}
          <div className="grid grid-cols-4 h-11.25 items-center justify-between border-b border-[#2f2f2f]">
            <span className="text-gray text-xs col-span-2 gap-2 flex items-center justify-center text-center border-r border-[#2f2f2f] h-full px-1">
              <span className="text-[#ef7c00] font-semibold truncate max-w-25">{nickname}</span>
              <span className="shrink-0">반갑습니다</span>
            </span>
            <Link
              href="/messages"
              onClick={onClose}
              className="flex h-full items-center justify-center gap-0.5 border-r border-[#2f2f2f] text-[10px] font-bold text-[#d4af37] hover:bg-[#2f2f2f]/40"
            >
              쪽지
              <span className={totalUnread > 0 ? "text-red-500" : "text-[#9ca3af]"}>({totalUnread > 99 ? "99+" : totalUnread})</span>
            </Link>
            <Button
              variant="transparent"
              onClick={handleLogout}
              className="text-[#3ea2d9] h-full text-xs font-medium hover:text-[#3ea2d9] cursor-pointer"
            >
              로그아웃
            </Button>
          </div>

          {/* Row 2: Money + Points */}
          <div className="flex items-center justify-center gap-4 h-11.25 px-4 border-b border-[#2f2f2f]">
            <div className="flex items-center flex-1 text-center gap-2">
              <span className="text-gray text-xs">머니</span>
              <div className="flex items-center gap-1 justify-center flex-1">
                <strong className="text-[#47fd0e] text-center font-bold text-xs">
                  {money.toLocaleString()}원
                </strong>
                <button
                  type="button"
                  aria-label="Refresh"
                  onClick={handleRefresh}
                  className="text-gray hover:text-white transition-colors p-1"
                >
                  <TfiReload className="size-5 text-gray/50" />
                </button>
              </div>

            </div>
            <div className="flex items-center flex-1 gap-2">
              <span className="text-white text-xs">포인트</span>
              <strong className="text-[#47fd0e] flex-1 text-center font-bold text-xs">
                {points.toLocaleString()}P
              </strong>
            </div>
          </div>

          <div className="flex flex-col">
            {/* Row 3: Action buttons grid */}
            <div className="grid grid-cols-4 border-b border-[#2f2f2f]">
              <Link
                href="/points"
                className="h-11.25 flex items-center justify-center w-full text-center text-gray text-xs font-medium border-r border-b border-[#2f2f2f] hover:bg-[#2f2f2f]/50 transition-colors"
              >
                포인트전환
              </Link>
              <Link
                href="/deposit"
                className="h-11.25 flex items-center justify-center w-full text-center text-gray text-xs font-medium border-r border-b border-[#2f2f2f] hover:bg-[#2f2f2f]/50 transition-colors"
              >
                입금하기
              </Link>
              <Link
                href="/deposit-trc20"
                className="h-11.25 flex items-center justify-center w-full text-center text-gray text-xs font-medium border-r border-b border-[#2f2f2f] hover:bg-[#2f2f2f]/50 transition-colors"
              >
                테더입금하기
              </Link>
              <Link
                href="/withdraw"
                className="h-11.25 flex items-center justify-center w-full text-center text-gray text-xs font-medium border-b border-[#2f2f2f] hover:bg-[#2f2f2f]/50 transition-colors"
              >
                출금하기
              </Link>
            </div>
            {/* Bottom: Full-width CTA */}
            <Link
              href="#"
              className="h-11.25 flex items-center justify-center px-4 text-center text-gray text-xs font-medium bg-[#850909] hover:bg-[#850909]/90 transition-colors"
            >
              카지노 & 슬롯 머니 가져오기
            </Link>
          </div>

        </div>

        {/* My Page - right column, spans rows 1-3 */}
        <Link
          href="/my-page"
          className="flex items-center justify-center w-20 shrink-0 bg-[#161616] border-l border-b border-[#2f2f2f] text-gray text-xs font-medium hover:bg-[#2f2f2f]/50 transition-colors"
        >
          <span className="[text-orientation:mixed]">
            마이페이지
          </span>
        </Link>
      </div>
    </div>
  );
}

function LoginFormContent({
  onSignUp,
  onClose,
}: {
  onSignUp: () => void;
  onClose: () => void;
}) {
  const { setCurrentUser } = useUser();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <form
      className="flex flex-col gap-4 w-full max-w-[90%] mx-auto"
      onSubmit={handleLogin}
    >
      <input
        type="text"
        placeholder="ID"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        disabled={isLoading}
        autoComplete="username"
        className={cn(
          "w-full rounded-md px-4 py-3 h-12",
          "bg-[#7e8a93] placeholder:text-[#ffc967]/90",
          "text-white font-medium",
          "focus:outline-none focus:ring-2 focus:ring-[#ffc000]/50"
        )}
      />
      <input
        type="password"
        placeholder="PW"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        autoComplete="current-password"
        className={cn(
          "w-full rounded-md px-4 py-3 h-12",
          "bg-[#7e8a93] placeholder:text-[#ffc967]/90",
          "text-white font-medium",
          "focus:outline-none focus:ring-2 focus:ring-[#ffc000]/50"
        )}
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-12 rounded-md font-bold text-white bg-[#42526b] hover:bg-[#42526b]/90"
      >
        {isLoading ? "로그인 중..." : "로그인"}
      </Button>
      <Button
        type="button"
        onClick={() => {
          onClose();
          onSignUp();
        }}
        className="w-full h-12 rounded-md font-bold text-white bg-[#28303d] hover:bg-[#28303d]/90"
      >
        회원가입
      </Button>
    </form>
  );
}

export function UserSidebar({ isOpen, onClose }: UserSidebarProps) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="user-sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-99 bg-black/50"
              onClick={onClose}
              aria-hidden
            />
            <UserSidebarContent key="user-sidebar-content" onClose={onClose} />
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
