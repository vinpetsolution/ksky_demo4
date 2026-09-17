"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { cn } from "@/utils/classNames";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

interface QnAWriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const inputBase = cn(
  "rounded-xl text-sm placeholder:text-sm border border-[#30363d] bg-[#0d1117] px-4 py-3",
  "text-white placeholder:text-white/40",
  "focus:outline-none"
);

export function QnAWriteModal({ isOpen, onClose, onCreated }: QnAWriteModalProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const resetForm = () => {
    setTitle("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("제목을 입력해주세요.");
      return;
    }
    if (!message.trim()) {
      toast.error("내용을 입력해주세요.");
      return;
    }
    if (title.length > 200) {
      toast.error("제목은 200자를 초과할 수 없습니다.");
      return;
    }
    if (message.length > 1000) {
      toast.error("내용은 1000자를 초과할 수 없습니다.");
      return;
    }

    toast.success("문의가 등록되었습니다.");
    onCreated?.();
    onClose();
    resetForm();
    setLoading(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qna-write-modal-title"
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden bg-[#313742] shadow-2xl border border-[#313742]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex shrink-0 items-center justify-center h-13.5">
          <h2 id="qna-write-modal-title" className="text-lg font-bold text-white">
            글쓰기
          </h2>
          <Button
            variant="darkBlueGlow"
            type="button"
            onClick={onClose}
            className="absolute size-13.5 text-2xl right-0 top-0 rounded-none"
            aria-label="닫기"
          >
            &times;
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 bg-[#11141d] flex-1 flex-col overflow-hidden"
        >
          <div className="scrollbar-thin flex-1 overflow-y-auto">
            <div className="space-y-4 p-6">
              <div className="flex flex-col">
                <label className="text-sm text-gray mb-2">제목</label>
                <input
                  type="text"
                  placeholder="제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={200}
                  className={cn(inputBase, "w-full h-10")}
                  disabled={loading}
                />
                <p className="mt-1 text-right text-xs text-white/40">{title.length}/200</p>
              </div>

              <div className="flex flex-col">
                <label className="text-sm text-gray mb-2">내용</label>
                <textarea
                  placeholder="문의 내용을 입력하세요"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={1000}
                  rows={8}
                  className={cn(inputBase, "w-full resize-none")}
                  disabled={loading}
                />
                <p className="mt-1 text-right text-xs text-white/40">{message.length}/1000</p>
              </div>
            </div>
          </div>

          <div className="border-t border-[#313742]">
            <Button
              type="submit"
              variant="darkBlueGlow"
              size="lg"
              fullWidth
              className="rounded-none h-20 text-gray text-center p-0 border-none"
              disabled={loading}
            >
              {loading ? "처리중..." : "등록"}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
