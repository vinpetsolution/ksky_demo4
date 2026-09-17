"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useAgentCode } from "./AgentCodeProvider";
import { LoginModal } from "@/components/ui/LoginModal";
// import { AgentCodeModal } from "@/components/ui/AgentCodeModal";
import { RegistrationModal } from "@/components/ui/RegistrationModal";

interface AuthModalContextValue {
  openLogin: () => void;
  openSignUp: () => void;
}

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const { clearAgentCode } = useAgentCode();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  // const [isAgentCodeModalOpen, setIsAgentCodeModalOpen] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  const openLogin = useCallback(() => setIsLoginModalOpen(true), []);
  
  // Skip AgentCodeModal, open RegistrationModal directly
  const openSignUp = useCallback(() => {
    setIsLoginModalOpen(false);
    setIsRegistrationModalOpen(true);
  }, []);

  // TODO: Enable AgentCodeModal when needed
  // const openSignUp = useCallback(() => {
  //   setIsLoginModalOpen(false);
  //   if (agentCode) {
  //     setIsAgentCodeModalOpen(false);
  //     setIsRegistrationModalOpen(true);
  //   } else {
  //     setIsAgentCodeModalOpen(true);
  //   }
  // }, [agentCode]);

  // const handleAgentCodeSuccess = useCallback(
  //   (code: string) => {
  //     setAgentCode(code);
  //     setIsAgentCodeModalOpen(false);
  //     setIsRegistrationModalOpen(true);
  //   },
  //   [setAgentCode]
  // );

  const handleRegistrationComplete = useCallback(() => {
    clearAgentCode();
  }, [clearAgentCode]);

  return (
    <AuthModalContext.Provider value={{ openLogin, openSignUp }}>
      {children}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onOpenSignUp={openSignUp}
      />
      {/* TODO: Enable AgentCodeModal when needed */}
      {/* <AgentCodeModal
        key={isAgentCodeModalOpen ? "open" : "closed"}
        isOpen={isAgentCodeModalOpen}
        onClose={() => setIsAgentCodeModalOpen(false)}
        onSuccess={handleAgentCodeSuccess}
      /> */}
      <RegistrationModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setIsRegistrationModalOpen(false)}
        onRegistrationComplete={handleRegistrationComplete}
      />
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const ctx = useContext(AuthModalContext);
  if (!ctx) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }
  return ctx;
}
