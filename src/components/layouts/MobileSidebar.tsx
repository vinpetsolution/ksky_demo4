"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/utils/classNames";
import { LazyMotion, domAnimation, motion, AnimatePresence } from "@/lib/motion";
import { NAV_ITEMS, type NavItem } from "./NavBar/navItems";
import { MOCK_USER } from "@/mocks/user";
import { Button } from "../ui/Button";
import { useUser } from "@/components/providers/UserProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

function flattenNavItems(items: NavItem[]): { label: string; href: string }[] {
  const result: { label: string; href: string }[] = [];
  for (const item of items) {
    if (item.children?.length) {
      for (const child of item.children) {
        const label =
          item.mobileLabelFormat === 'parent-child'
            ? `${item.label} - ${child.label}`
            : child.label;
        result.push({ label, href: child.href });
      }
    } else {
      result.push({ label: item.label, href: item.href });
    }
  }
  return result;
}

const flatNavItems = flattenNavItems(NAV_ITEMS);

function MobileSidebarContent({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const prevPathnameRef = useRef<string | null>(null);
  const { currentUser } = useUser();
  const { openLogin } = useAuthModal();

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

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    if (!currentUser) {
      onClose();
      openLogin();
      return;
    }
    onClose();
    router.push(href);
  };

  return (
    <motion.div
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
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

      {/* Main: two columns */}
      <div className="flex-1 flex min-h-0">
        {/* Left: Nav list */}
        <div className="flex-1 overflow-y-auto bg-[#161616]">
          <nav className="flex flex-col">
            {flatNavItems.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <a
                  key={`${item.label}-${index}`}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={cn(
                    "px-6 h-11.25 text-white font-medium text-sm cursor-pointer",
                    "border border-[#2f2f2f] border-t-0",
                    "hover:bg-[#1c293f]/50 transition-colors flex items-center",
                    isActive ? "text-glow-static" : "text-glow"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
            {/* Role item - same as AccountInfo */}
            <div
              className={cn(
                "px-6 h-11.25 font-medium text-sm flex items-center",
                "border border-[#2f2f2f] border-t-0",
                "text-glow-static"
              )}
            >
              {currentUser?.result?.user?.role || MOCK_USER.role}
            </div>
          </nav>
        </div>

        {/* Right: Sub-content area */}
        <div className="flex-1 bg-[#161616] flex flex-col">
          <div className="h-11.25 flex items-center justify-center text-sm font-medium bg-[#850909] text-gray hover:bg-[#850909]/80 hover:text-[#ef7c00] active:bg-[#850909]/80 active:text-[#ef7c00] disabled:bg-[#850909]/80 disabled:text-white">
            카지노 & 슬롯 머니 가져오기
          </div>
          <div className="flex-1" />
        </div>
      </div>
    </motion.div>
  );
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-99 bg-black/50"
              onClick={onClose}
              aria-hidden
            />
            <MobileSidebarContent key="sidebar-content" onClose={onClose} />
          </>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
}
