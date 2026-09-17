"use client";

import { useEffect } from "react";
import { useUser } from "@/components/providers/UserProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { currentUser, loadingUser } = useUser();
  const { openLogin } = useAuthModal();
  const router = useRouter();

  useEffect(() => {
    if (!loadingUser && !currentUser) {
      router.replace("/");
      setTimeout(() => {
        openLogin();
      }, 100);
    }
  }, [currentUser, loadingUser, openLogin, router]);

  if (loadingUser) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return <>{children}</>;
}
