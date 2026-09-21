"use client";

import { useState, Suspense } from "react";
import { cn } from "@/utils/classNames";
import Link from "next/link";
import Image from "next/image";
import { HiOutlineMenu } from "react-icons/hi";
import NavBar from "./NavBar";
import AccountInfo from "./AccountInfo";
import { MobileSidebar } from "./MobileSidebar";
import { UserSidebar } from "./UserSidebar";
import { Button } from "../ui/Button";
import { useUser } from "@/components/providers/UserProvider";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserSidebarOpen, setIsUserSidebarOpen] = useState(false);
  const { currentUser } = useUser();

  const isLoggedIn = !!currentUser?.result?.token;
  const money = currentUser?.result?.user?.balanceMoney || 0;
  const points = currentUser?.result?.user?.balancePoint || 0;

  return (
    <>
      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <UserSidebar
        isOpen={isUserSidebarOpen}
        onClose={() => setIsUserSidebarOpen(false)}
      />
      <header
        className={cn(
          "relative z-50 w-full text-center",
          "bg-linear-to-b from-[#1e2b42] to-[#131b2a]",
          "border-t border-[#1b283d] border-b-[3px] border-b-[#1b283d]",
          "h-16 xl:h-18",
          "max-lg:min-h-17.5 max-lg:h-auto max-lg:bg-none max-lg:bg-[#070a0f] max-lg:py-1.5 max-lg:border-t-0 max-lg:border-b-2 max-lg:border-b-[#1c293f]",
        )}
      >
        <div
          className={cn(
            "relative z-50 mx-auto flex h-full w-full items-center px-5",
            "max-lg:grid max-lg:min-h-17.5 max-lg:h-auto max-lg:grid-cols-3 max-lg:items-center max-lg:gap-4 max-lg:px-4",
          )}
        >
          <Button
            variant="transparent"
            aria-label="Menu"
            onClick={() => setIsSidebarOpen(true)}
            className="hidden h-10 w-10 shrink-0 items-center justify-center text-white max-lg:flex"
          >
            <HiOutlineMenu className="size-6" />
          </Button>

          <Link
            href="/"
            className={cn(
              "block shrink-0",
              "max-lg:flex max-lg:justify-center",
            )}
          >
            <Image
              src="/images/logo/ksky.png"
              alt="KSKY SOLUTION"
              width={152}
              height={47}
              className={cn(
                "block h-9 w-auto object-contain xl:h-10",
                "max-lg:h-auto max-lg:w-30",
              )}
              priority
            />
          </Link>

          <div className="min-w-0 flex-1 max-lg:hidden">
            <Suspense fallback={<div className="h-10" />}>
              <NavBar />
            </Suspense>
          </div>

          <div className="ml-auto shrink-0 max-lg:hidden">
            <AccountInfo />
          </div>

          <div className="hidden flex-col items-end justify-center gap-0.5 max-lg:flex">
            <button
              type="button"
              onClick={() => setIsUserSidebarOpen(true)}
              aria-label="User menu"
              className="flex items-center justify-end"
            >
              <Image
                src="/images/user_ico.svg"
                alt="User"
                width={50}
                height={50}
                className="size-10 object-contain"
              />
            </button>
            {isLoggedIn && (
              <p className="text-right text-[10px] leading-tight font-semibold whitespace-nowrap">
                <span className="text-gray">
                  Money:{" "}
                  <strong className="font-bold text-[#47fd0e]">
                    {money.toLocaleString()}
                  </strong>
                </span>{" "}
                <span className="text-gray">
                  Points:{" "}
                  <strong className="font-bold text-[#47fd0e]">
                    {points.toLocaleString()}
                  </strong>
                </span>
              </p>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
