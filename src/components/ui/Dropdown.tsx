"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/utils/classNames";
import { IoChevronDown } from "react-icons/io5";
import { Button } from "./Button";

export interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  position?: "bottom" | "top" | "auto";
  className?: string;
  buttonClassName?: string;
}

export function Dropdown({
  options,
  value = "",
  onChange,
  placeholder = "선택하세요.",
  position = "auto",
  className,
  buttonClassName,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">("bottom");
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen || position !== "auto" || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const newPos = spaceBelow >= 200 || spaceBelow >= spaceAbove ? "bottom" : "top";
    const rafId = requestAnimationFrame(() => setDropdownPosition(newPos));
    return () => cancelAnimationFrame(rafId);
  }, [isOpen, position]);

  const displayPosition = position === "auto" ? dropdownPosition : position;

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <Button
        variant="transparent"
        type="button"
        onClick={() => setIsOpen((o) => !o)}
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-xl border border-[#30363d] bg-[#11141d] px-4 py-3 h-10",
          "text-left text-sm text-gray placeholder:text-white/40",
          "focus:outline-hidden"
          , buttonClassName)}
        rightIcon={<IoChevronDown
          className={cn(
            "size-5 shrink-0 text-white/70 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />}
      >
        <span className={selectedOption ? "text-gray" : "text-gray/50"}>
          {selectedOption?.label ?? placeholder}
        </span>

      </Button>

      {isOpen && (
        <div
          ref={menuRef}
          className={cn(
            "absolute left-0 right-0 z-50 max-h-48 overflow-y-auto rounded-xl border border-[#30363d] bg-[#11141d] shadow-lg",
            "scrollbar-thin",
            displayPosition === "bottom" ? "top-full mt-1" : "bottom-full mb-1"
          )}
        >
          {options.map((opt, index) => (
            <Button
              variant="transparent"
              key={opt.value}
              type="button"
              onClick={() => {
                onChange?.(opt.value);
                setIsOpen(false);
              }}
              className={cn(
                "flex w-full items-center px-4 rounded-none justify-start py-2.5 text-left text-sm transition-colors",
                index === 0 && "rounded-t-xl",
                index === options.length - 1 && "rounded-b-xl",
                opt.value === value
                  ? "bg-[#1a73e8] text-white"
                  : "text-white hover:bg-[#1a73e8]/80 hover:text-white"
              )}
            >
              {opt.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
