"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getStorageKey } from "@/utils/storage";
import { AuthResponse } from "@/types";
import { clearAllAuthData, isMemberSiteBlockedAgentRole } from "@/utils/auth";
import { getStorageKey as getStorageKeyName } from "@/constants/store-key";

type Props = PropsWithChildren<object>;

interface UserContextType {
  loadingUser: boolean;
  currentUser: AuthResponse | undefined;
  setCurrentUser: (user: AuthResponse | undefined) => void;
  refetchUserInfo: () => Promise<void>;
}

const initialUserContext: UserContextType = {
  loadingUser: true,
  currentUser: undefined,
  setCurrentUser: () => { },
  refetchUserInfo: async () => { },
};

const UserContext = createContext<UserContextType>(initialUserContext);

export function UserProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<AuthResponse | undefined>(undefined);
  const [loadingUser, setLoadingUser] = useState(true);

  const hydrateSession = useCallback(() => {
    if (typeof window === "undefined") return;

    const auth = getStorageKey({ key: getStorageKeyName() });
    if (auth) {
      try {
        const parsed = JSON.parse(auth) as AuthResponse;
        if (isMemberSiteBlockedAgentRole(parsed?.result?.user?.role)) {
          clearAllAuthData();
          setCurrentUser(undefined);
        } else {
          setCurrentUser(parsed);
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
        clearAllAuthData();
        setCurrentUser(undefined);
      }
    } else {
      setCurrentUser(undefined);
    }
    setLoadingUser(false);
  }, []);

  useEffect(() => {
    // Hydrate demo session from sessionStorage after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    hydrateSession();
  }, [hydrateSession]);

  const refetchUserInfo = useCallback(async () => {
    hydrateSession();
  }, [hydrateSession]);

  if (loadingUser) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        loadingUser,
        currentUser,
        setCurrentUser,
        refetchUserInfo,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
