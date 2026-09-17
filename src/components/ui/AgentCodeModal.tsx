"use client";

import { createPortal } from "react-dom";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/utils/classNames";
import { Button } from "@/components/ui/Button";

interface AgentCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (agentCode: string) => void;
}

const AGENT_CODE_REGEX = /^[a-zA-Z0-9]{4,}$/;

export function AgentCodeModal({
  isOpen,
  onClose,
  onSuccess,
}: AgentCodeModalProps) {
  const [agentCode, setAgentCode] = useState("");
  const [error, setError] = useState("");

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleEscape]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = agentCode.trim();
    if (!trimmed) {
      setError("추천인 코드를 입력해주세요.");
      return;
    }
    if (!AGENT_CODE_REGEX.test(trimmed)) {
      setError("4자 이상 영문, 숫자만 가능합니다.");
      return;
    }
    setError("");
    onSuccess(trimmed);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/70"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="agent-code-modal-title"
    >
      <div
        className="relative w-full max-w-md overflow-hidden bg-[#313742] shadow-2xl border border-[#313742]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-center h-13.5">
          <h2
            id="agent-code-modal-title"
            className="text-lg font-bold text-white"
          >
            회원가입
          </h2>
          <Button
            variant="darkBlueGlow"
            onClick={onClose}
            className="absolute size-13.5 text-2xl right-0 top-0 rounded-none"
            aria-label="Đóng"
          >
            &times;
          </Button>
        </div>
        <form onSubmit={handleSubmit} className="bg-[#11141d]">
          <div className="pt-5 pb-4 px-6 border-b border-[#313742]">
            <label
              htmlFor="agent-code"
              className="mb-2 block text-sm font-medium text-gray-300"
            >
              추천인 (4자이상 영문, 숫자만 가능)
            </label>
            <input
              id="agent-code"
              type="text"
              value={agentCode}
              onChange={(e) => {
                setAgentCode(e.target.value);
                setError("");
              }}
              placeholder="추천인 (4자이상 영문, 숫자만 가능)"
              className={cn(
                "w-full rounded-full border border-[#3a3a3a] bg-[#0d1117] px-4 py-3",
                "text-white placeholder:text-white/40",
                "focus:border-[#ff8c00] focus:outline-hidden focus:ring-1 focus:ring-[#ff8c00]/50",
                error && "border-red-500"
              )}
              autoComplete="off"
            />
            {error && (
              <p className="mt-2 text-sm text-red-400">{error}</p>
            )}
          </div>
          {/* Footer */}
          <div className="border-t border-[#313742]">
            <Button
              type="submit"
              variant="darkBlueGlow"
              size="lg"
              fullWidth
              className="rounded-none h-20 tex-center p-0 border-none"
            >
              회원가입
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
