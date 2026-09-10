import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { restoreSession, saveSession } from "./session";

type SessionContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
};

const SessionContext = createContext<SessionContextValue | null>(null);

type SessionProviderProps = {
  children: ReactNode;
};

export function SessionProvider({ children }: SessionProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function restore() {
      try {
        const authenticated = await restoreSession();
        if (active) setIsAuthenticated(authenticated);
      } catch {
        // If storage cannot be read, allow the user to sign in again.
        if (active) setIsAuthenticated(false);
      } finally {
        if (active) setIsLoading(false);
      }
    }

    void restore();
    return () => {
      active = false;
    };
  }, []);

  async function signIn() {
    await saveSession();
    setIsAuthenticated(true);
  }

  return (
    <SessionContext.Provider value={{ isAuthenticated, isLoading, signIn }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const session = useContext(SessionContext);
  if (!session)
    throw new Error("useSession must be used within SessionProvider");
  return session;
}
