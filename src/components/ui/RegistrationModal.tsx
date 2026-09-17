"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { cn } from "@/utils/classNames";
import { Button } from "@/components/ui/Button";
import { Dropdown, type DropdownOption } from "@/components/ui/Dropdown";
import { toast } from "sonner";

const BANK_OPTIONS: DropdownOption[] = [
  { value: "KB국민은행", label: "KB국민은행" },
  { value: "신한은행", label: "신한은행" },
  { value: "우리은행", label: "우리은행" },
  { value: "하나은행", label: "하나은행" },
  { value: "NH농협은행", label: "NH농협은행" },
  { value: "IBK기업은행", label: "IBK기업은행" },
  { value: "SC제일은행", label: "SC제일은행" },
  { value: "HSBC은행", label: "HSBC은행" },
  { value: "전북은행", label: "전북은행" },
];

const PHONE_PREFIX_OPTIONS: DropdownOption[] = [
  { value: "010", label: "010" },
  { value: "011", label: "011" },
  { value: "016", label: "016" },
  { value: "017", label: "017" },
  { value: "018", label: "018" },
  { value: "019", label: "019" },
];

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegistrationComplete?: () => void;
}

interface FormErrors {
  userName?: string;
  nickName?: string;
  password?: string;
  confirmPassword?: string;
  phone?: string;
  bank?: string;
  bankHolder?: string;
  bankNo?: string;
  transactionPassword?: string;
  agentCode?: string;
}

const inputBase = cn(
  "rounded-xl text-sm placeholder:text-sm border border-[#30363d] bg-[#0d1117] px-4 py-3 h-10",
  "text-white placeholder:text-white/40",
  "focus:outline-none"
);

const inputError = "border-red-500";

const ErrorText = ({ message }: { message?: string }) => {
  if (!message) return null;
  return <p className="text-red-500 text-xs mt-1">{message}</p>;
};

const EyeIcon = ({ open }: { open: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5"
  >
    {open ? (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </>
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    )}
  </svg>
);

export function RegistrationModal({
  isOpen,
  onClose,
}: RegistrationModalProps) {
  const [selectedBank, setSelectedBank] = useState("");
  const [phonePrefix, setPhonePrefix] = useState("010");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showTransactionPassword, setShowTransactionPassword] = useState(false);

  // Form fields
  const [userName, setUserName] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneMid, setPhoneMid] = useState("");
  const [phoneLast, setPhoneLast] = useState("");
  const [bankHolder, setBankHolder] = useState("");
  const [bankNo, setBankNo] = useState("");
  const [transactionPassword, setTransactionPassword] = useState("");
  const [agentCode, setAgentCode] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handlePhoneInput = (value: string, setter: (val: string) => void) => {
    const numbersOnly = value.replace(/\D/g, "");
    if (numbersOnly.length <= 4) {
      setter(numbersOnly);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!userName.trim()) {
      newErrors.userName = "아이디를 입력해주세요.";
    }

    if (!password.trim()) {
      newErrors.password = "비밀번호를 입력해주세요.";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다.";
    }

    if (!phoneMid || !phoneLast) {
      newErrors.phone = "휴대폰번호를 입력해주세요.";
    }

    if (!selectedBank) {
      newErrors.bank = "출금은행을 선택해주세요.";
    }

    if (!bankHolder.trim()) {
      newErrors.bankHolder = "예금주를 입력해주세요.";
    }

    if (!bankNo.trim()) {
      newErrors.bankNo = "출금계좌를 입력해주세요.";
    }

    if (!transactionPassword.trim()) {
      newErrors.transactionPassword = "출금비밀번호를 입력해주세요.";
    }

    if (!agentCode.trim()) {
      newErrors.agentCode = "대리점 코드를 입력해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearError = (field: keyof FormErrors) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    toast.error("데모 페이지에서는 회원가입이 지원되지 않습니다.");
    resetForm();
    setLoading(false);
  };

  const resetForm = () => {
    setUserName("");
    setNickName("");
    setPassword("");
    setConfirmPassword("");
    setPhoneMid("");
    setPhoneLast("");
    setSelectedBank("");
    setBankHolder("");
    setBankNo("");
    setTransactionPassword("");
    setAgentCode("");
    setErrors({});
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowTransactionPassword(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-200 flex items-center justify-center p-4 bg-black/70"
      role="dialog"
      aria-modal="true"
      aria-labelledby="registration-modal-title"
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden bg-[#313742] shadow-2xl border border-[#313742]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative flex shrink-0 items-center justify-center h-13.5">
          <h2
            id="registration-modal-title"
            className="text-lg font-bold text-white"
          >
            회원가입
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

        {/* Body - scrollable */}
        <form
          noValidate
          onSubmit={handleSubmit}
          className="flex min-h-0 bg-[#11141d] flex-1 flex-col overflow-hidden"
        >
          <div className="scrollbar-thin flex-1 overflow-y-auto">
            <div className="space-y-4 p-6">
              {/* 아이디 */}
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="아이디"
                  value={userName}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    clearError("userName");
                  }}
                  className={cn(inputBase, "w-full", errors.userName && inputError)}
                  disabled={loading}
                />
                <ErrorText message={errors.userName} />
              </div>

              {/* 닉네임 */}
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="닉네임"
                  value={nickName}
                  onChange={(e) => {
                    setNickName(e.target.value);
                    clearError("nickName");
                  }}
                  className={cn(inputBase, "w-full", errors.nickName && inputError)}
                  disabled={loading}
                />
                <ErrorText message={errors.nickName} />
              </div>

              {/* 비밀번호 */}
              <div className="flex flex-col">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => {
                      const newPassword = e.target.value;
                      setPassword(newPassword);
                      clearError("password");
                      if (confirmPassword && newPassword !== confirmPassword) {
                        setErrors((prev) => ({ ...prev, confirmPassword: "비밀번호가 일치하지 않습니다." }));
                      } else if (confirmPassword) {
                        clearError("confirmPassword");
                      }
                    }}
                    className={cn(inputBase, "w-full pr-10", errors.password && inputError)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    tabIndex={-1}
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
                <ErrorText message={errors.password} />
              </div>

              {/* 비번확인 */}
              <div className="flex flex-col">
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="비번확인"
                    value={confirmPassword}
                    onChange={(e) => {
                      const newConfirmPassword = e.target.value;
                      setConfirmPassword(newConfirmPassword);
                      if (password && newConfirmPassword !== password) {
                        setErrors((prev) => ({ ...prev, confirmPassword: "비밀번호가 일치하지 않습니다." }));
                      } else {
                        clearError("confirmPassword");
                      }
                    }}
                    className={cn(inputBase, "w-full pr-10", errors.confirmPassword && inputError)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    tabIndex={-1}
                  >
                    <EyeIcon open={showConfirmPassword} />
                  </button>
                </div>
                <ErrorText message={errors.confirmPassword} />
              </div>

              {/* 휴대폰번호 입력 */}
              <div className="flex flex-col">
                <p className="text-sm text-center text-gray mb-2">휴대폰번호 입력</p>
                <div className="flex gap-2">
                  <Dropdown
                    options={PHONE_PREFIX_OPTIONS}
                    value={phonePrefix}
                    onChange={setPhonePrefix}
                    placeholder="010"
                    position="bottom"
                    className="w-25 shrink-0"
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="중간번호"
                    value={phoneMid}
                    onChange={(e) => {
                      handlePhoneInput(e.target.value, setPhoneMid);
                      clearError("phone");
                    }}
                    maxLength={4}
                    className={cn(inputBase, "flex-1 min-w-0", errors.phone && inputError)}
                    disabled={loading}
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="마지막번호"
                    value={phoneLast}
                    onChange={(e) => {
                      handlePhoneInput(e.target.value, setPhoneLast);
                      clearError("phone");
                    }}
                    maxLength={4}
                    className={cn(inputBase, "flex-1 min-w-0", errors.phone && inputError)}
                    disabled={loading}
                  />
                </div>
                <ErrorText message={errors.phone} />
              </div>

              {/* 출금계좌정보 */}
              <div className="flex flex-col">
                <p className="text-sm text-center text-gray mb-2">출금계좌정보</p>
                <div className="flex gap-2">
                  <Dropdown
                    options={BANK_OPTIONS}
                    value={selectedBank}
                    onChange={(val) => {
                      setSelectedBank(val);
                      clearError("bank");
                    }}
                    placeholder="출금은행"
                    position="bottom"
                    className={cn("flex-1 min-w-0", errors.bank && "border-red-500 rounded-xl")}
                  />
                  <input
                    type="text"
                    placeholder="예금주 입력"
                    value={bankHolder}
                    onChange={(e) => {
                      setBankHolder(e.target.value);
                      clearError("bankHolder");
                    }}
                    className={cn(inputBase, "flex-1 min-w-0", errors.bankHolder && inputError)}
                    disabled={loading}
                  />
                </div>
                {(errors.bank || errors.bankHolder) && (
                  <ErrorText message={errors.bank || errors.bankHolder} />
                )}
              </div>

              {/* 출금계좌 -없이 입력 */}
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="출금계좌 -없이 입력"
                  value={bankNo}
                  onChange={(e) => {
                    const numbersOnly = e.target.value.replace(/\D/g, "");
                    setBankNo(numbersOnly);
                    clearError("bankNo");
                  }}
                  className={cn(inputBase, "w-full", errors.bankNo && inputError)}
                  disabled={loading}
                />
                <ErrorText message={errors.bankNo} />
              </div>

              {/* 출금비번입력 */}
              <div className="flex flex-col">
                <div className="relative">
                  <input
                    type={showTransactionPassword ? "text" : "password"}
                    placeholder="출금비번입력"
                    value={transactionPassword}
                    onChange={(e) => {
                      setTransactionPassword(e.target.value);
                      clearError("transactionPassword");
                    }}
                    className={cn(inputBase, "w-full pr-10", errors.transactionPassword && inputError)}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowTransactionPassword(!showTransactionPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                    tabIndex={-1}
                  >
                    <EyeIcon open={showTransactionPassword} />
                  </button>
                </div>
                <ErrorText message={errors.transactionPassword} />
              </div>

              {/* 대리점 코드 */}
              <div className="flex flex-col">
                <p className="text-sm text-center text-gray mb-2">대리점 코드</p>
                <input
                  type="text"
                  placeholder="대리점 코드"
                  value={agentCode}
                  onChange={(e) => {
                    setAgentCode(e.target.value);
                    clearError("agentCode");
                  }}
                  className={cn(inputBase, "w-full", errors.agentCode && inputError)}
                  disabled={loading}
                />
                <ErrorText message={errors.agentCode} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#313742]">
            <Button
              type="submit"
              variant="darkBlueGlow"
              size="lg"
              fullWidth
              className="rounded-none h-20 text-gray text-center p-0 border-none"
              disabled={loading}
            >
              {loading ? "처리중..." : "회원가입"}
            </Button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
