"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/utils/classNames";
import { useUser } from "@/components/providers/UserProvider";
import { useAuthModal } from "@/components/providers/AuthModalProvider";

export interface CasinoCardProps {
  bgImage: string;
  minibgImage: string;
  mainIcon: string;
  href?: string;
  className?: string;
}

export function CasinoCard({
  minibgImage,
  mainIcon,
  href = "#",
  className,
}: CasinoCardProps) {
  const router = useRouter();
  const { currentUser } = useUser();
  const { openLogin } = useAuthModal();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openLogin();
      return;
    }
    if (href && href !== "#") {
      router.push(href);
    }
  };

  return (
    <div onClick={handleClick} className="block group cursor-pointer">
      <div
        className={cn(
          "relative aspect-400/170 w-full overflow-hidden border transition-colors duration-200",
          "border-[#4d5a8b] hover:border-[#ef7c00]",
          className
        )}
      >
        {/* Minibg - right, scale on hover */}
        <div className="absolute right-0 -translate-x-1/2 bottom-0 z-10 h-full w-1/2 transition-transform duration-300 group-hover:scale-105 md:w-[45%]">
          <Image
            src={minibgImage}
            alt=""
            fill
            className="object-contain object-bottom-right"
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* Main icon - left, beat animation, responsive size */}
        <div className="absolute left-2 top-1/2 z-20 h-14 w-28 -translate-y-1/2 md:left-4 md:h-16 md:w-32 lg:h-16 lg:w-32 xl:h-20 xl:w-40">
          <Image
            src={mainIcon}
            alt=""
            fill
            className="w-full h-full object-contain animate-beat"
            sizes="(max-width: 768px) 112px, (max-width: 1024px) 144px, (max-width: 1280px) 144px, 160px"
          />
        </div>
      </div>
    </div>
  );
}
