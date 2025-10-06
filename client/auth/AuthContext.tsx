import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type Role = "guest" | "student" | "instructor" | "admin";
export type User = { id: string; name: string; email: string; role: Role };

const STORAGE_KEY = "jph.auth.user";

export type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: Role) => boolean;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) setUser(JSON.parse(raw) as User);
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  async function login(email: string, password: string) {
    // Simple demo auth: admin@jph.local / admin123 => admin
    // Any other email with password "student" => student
    if (email === "admin@jph.local" && password === "admin123") {
      setUser({ id: "1", name: "Administrator", email, role: "admin" });
      return { ok: true };
    }
    if (password === "student") {
      setUser({ id: "2", name: email.split("@")[0] || "Student", email, role: "student" });
      return { ok: true };
    }
    return { ok: false, error: "Invalid credentials" };
  }

  function logout() {
    setUser(null);
  }

  const value = useMemo<AuthContextValue>(() => ({
    user,
    login,
    logout,
    isAuthenticated: !!user,
    hasRole: (role: Role) => {
      if (!user) return false;
      if (role === "guest") return true;
      if (role === "student") return user.role === "student" || user.role === "instructor" || user.role === "admin";
      if (role === "instructor") return user.role === "instructor" || user.role === "admin";
      if (role === "admin") return user.role === "admin";
      return false;
    },
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function RequireRole({ role, children }: { role: Role; children: React.ReactNode }) {
  const { hasRole } = useAuth();
  if (!hasRole(role)) return null;
  return <>{children}</>;
}
