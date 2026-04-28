import React, { createContext, useContext, useMemo, useState } from "react";
import { getAuthRole, getStoredToken, getStoredUserId, setStoredSession, logout as clearSession } from "../services/auth";

const AuthContext = createContext(null);

function getInitialSession() {
  return {
    token: getStoredToken(),
    userId: getStoredUserId(),
    role: getAuthRole(),
  };
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(getInitialSession);

  const login = ({ token, userId, role }) => {
    setStoredSession({ token, userId, role });
    setSession({
      token: token || null,
      userId: userId ?? null,
      role: role || null,
    });
  };

  const logout = () => {
    clearSession();
    setSession({ token: null, userId: null, role: null });
  };

  const value = useMemo(
    () => ({
      token: session.token,
      userId: session.userId,
      role: session.role,
      isAuthenticated: Boolean(session.token && session.userId !== null && session.role),
      login,
      logout,
    }),
    [session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
