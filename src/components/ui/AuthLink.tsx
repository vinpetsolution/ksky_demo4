"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/components/providers/UserProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import { cn } from "@/utils/classNames";

interface AuthLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  requireAuth?: boolean;
  onClick?: () => void;
}

export function AuthLink({
  href,
  children,
  className,
  requireAuth = true,
  onClick,
}: AuthLinkProps) {
  const router = useRouter();
  const { currentUser } = useUser();
  const { openLogin } = useAuthModal();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (requireAuth && !currentUser) {
      openLogin();
      return;
    }
    
    onClick?.();
    
    if (href && href !== "#") {
      router.push(href);
    }
  };

  return (
    <span onClick={handleClick} className={cn("cursor-pointer", className)}>
      {children}
    </span>
  );
}
