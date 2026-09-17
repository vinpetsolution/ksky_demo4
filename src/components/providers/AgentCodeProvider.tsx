"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface AgentCodeContextValue {
  agentCode: string;
  setAgentCode: (code: string) => void;
  clearAgentCode: () => void;
}

const AgentCodeContext = createContext<AgentCodeContextValue | null>(null);

export function AgentCodeProvider({ children }: { children: ReactNode }) {
  const [agentCode, setAgentCodeState] = useState("");

  const setAgentCode = useCallback((code: string) => {
    setAgentCodeState(code);
  }, []);

  const clearAgentCode = useCallback(() => {
    setAgentCodeState("");
  }, []);

  return (
    <AgentCodeContext.Provider
      value={{ agentCode, setAgentCode, clearAgentCode }}
    >
      {children}
    </AgentCodeContext.Provider>
  );
}

export function useAgentCode() {
  const ctx = useContext(AgentCodeContext);
  if (!ctx) {
    throw new Error("useAgentCode must be used within AgentCodeProvider");
  }
  return ctx;
}
