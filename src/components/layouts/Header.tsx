"use client";

import { useState } from "react"
import { Suspense } from "react"
import { cn } from "@/utils/classNames"
import Link from "next/link"
import Image from "next/image"
import { HiOutlineMenu } from "react-icons/hi"
import NavBar from "./NavBar"
import AccountInfo from "./AccountInfo"
import { MobileSidebar } from "./MobileSidebar"
import { UserSidebar } from "./UserSidebar"
import { Button } from "../ui/Button"
import { useUser } from "@/components/providers/UserProvider"


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
      <header className={cn(
        // Desktop (>= 1024px)
        "bg-linear-to-b from-[#1e2b42] to-[#131b2a]",
        "border-t border-[#1b283d] border-b-[3px] border-b-[#1b283d]",
        "h-27 text-center overflow-visible",
        "relative z-50 w-full shadow-[0_0_10px_rgba(0,0,0,0.5)]",
        // Mobile/Tablet (< 1024px)
        "max-lg:bg-none max-lg:bg-[#070a0f] max-lg:min-h-17.5 max-lg:h-auto max-lg:py-1.5 max-lg:border-b-2 max-lg:border-b-[#1c293f] max-lg:border-t-0",
      )}>
        <div className={cn(
          "block text-left mx-auto w-full h-26 relative z-50",
          "max-lg:h-auto max-lg:min-h-17.5 max-lg:grid max-lg:grid-cols-3 max-lg:items-center max-lg:px-4 max-lg:gap-4",
        )}>
          {/* Hamburger - left */}
          <Button
            variant="transparent"
            aria-label="Menu"
            onClick={() => setIsSidebarOpen(true)}
            className="hidden max-lg:flex items-center justify-center w-10 h-10 text-white shrink-0"
          >
            <HiOutlineMenu className="size-6" />
          </Button>

          {/* Logo - center on mobile, left on desktop */}
          <Link
            href="/"
            className={cn(
              "block absolute left-5 top-1/2 -translate-y-1/2",
              "max-lg:static max-lg:flex max-lg:justify-center max-lg:translate-y-0",
            )}
          >
            <Image
              src="/images/logo/ksky.png"
              alt="KSKY SOLUTION"
              width={152}
              height={47}
              className={cn(
                "w-full h-full object-cover block m-0 p-0 border-0",
                "max-lg:w-30 max-lg:h-auto",
              )}
              priority
            />
          </Link>

          {/* User icon + mobile balance - right */}
          <div className="hidden max-lg:flex flex-col items-end justify-center gap-0.5">
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
              <p className="text-[10px] leading-tight font-semibold whitespace-nowrap text-right">
                <span className="text-gray">
                  Money:{" "}
                  <strong className="text-[#47fd0e] font-bold">
                    {money.toLocaleString()}
                  </strong>
                </span>{" "}
                <span className="text-gray">
                  Points:{" "}
                  <strong className="text-[#47fd0e] font-bold">
                    {points.toLocaleString()}
                  </strong>
                </span>
              </p>
            )}
          </div>

          {/* Desktop: AccountInfo */}
          <div className="max-lg:hidden">
            <AccountInfo />
          </div>
        </div>

        {/* NavBar - hidden on mobile */}
        <div className="max-lg:hidden">
          <Suspense fallback={<div className="h-14" />}>
            <NavBar />
          </Suspense>
        </div>
      </header>
    </>
  )
}
export default Header
