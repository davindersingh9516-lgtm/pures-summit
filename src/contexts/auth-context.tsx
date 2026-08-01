"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface Customer {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextValue {
  customer: Customer | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<Customer>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * FUTURE AUTH ARCHITECTURE
 * ---------------------------------------------------------------------------
 * No customer session exists yet - WooCommerce customer auth (JWT/session
 * cookie via WooGraphQL) isn't wired up. `login`/`logout` intentionally
 * throw rather than silently no-op, so the account feature module (built
 * later) fails loudly instead of appearing to work. The shape (`Customer`,
 * `isAuthenticated`) is stable so wiring the real mutation only touches
 * this file.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [customer] = useState<Customer | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      customer,
      isAuthenticated: customer !== null,
      login: async () => {
        throw new Error(
          "Customer authentication is not implemented yet - requires WooGraphQL customer login mutation.",
        );
      },
      logout: async () => {
        throw new Error(
          "Customer authentication is not implemented yet - requires WooGraphQL customer logout mutation.",
        );
      },
    }),
    [customer],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
