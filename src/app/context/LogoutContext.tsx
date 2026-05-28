import React, { createContext, useContext } from 'react';

interface LogoutContextValue {
  logout: () => void;
  isReturning: boolean;
}

const LogoutContext = createContext<LogoutContextValue>({ logout: () => {}, isReturning: false });

export const LogoutProvider = ({
  children,
  onLogout,
  isReturning = false,
}: {
  children: React.ReactNode;
  onLogout: () => void;
  isReturning?: boolean;
}) => (
  <LogoutContext.Provider value={{ logout: onLogout, isReturning }}>{children}</LogoutContext.Provider>
);

export const useLogout = () => useContext(LogoutContext).logout;
export const useIsReturning = () => useContext(LogoutContext).isReturning;
