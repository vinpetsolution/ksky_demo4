"use client";

import { cn } from "@/utils/classNames";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer
            className={cn(
                "bg-linear-to-b from-[#111927] to-[#0d131d]",
                "pt-1.25 text-center text-xs font-semibold text-[#a6a7a8]",
                "relative z-10 w-full flex flex-col items-center justify-center",
                "max-md:h-auto max-md:py-4 max-md:px-2.5"
            )}
        >
            <Link
                href="/"
                className="mx-auto flex items-center justify-center"
            >
                <Image
                    src="/images/logo/ksky.png"
                    alt="KSKY SOLUTION"
                    width={192}
                    height={128}
                    className="block mx-auto h-32 w-auto object-cover max-md:my-2.5 max-md:h-16"
                    priority
                />
            </Link>
        </footer>
    );
}
