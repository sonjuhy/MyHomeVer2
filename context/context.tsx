// context/context.tsx
import React, { createContext, useContext, ReactNode } from "react";

interface PortfolioContextType {
  prefix: string;
  // 다른 속성들도 필요한 경우 추가
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);

interface PortfolioProviderProps {
  value: PortfolioContextType;
  children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({
  children,
  value,
}) => (
  <PortfolioContext.Provider value={value}>
    {children}
  </PortfolioContext.Provider>
);

export const usePortfolioContext = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error(
      "usePortfolioContext must be used within a PortfolioProvider"
    );
  }
  return context;
};

export default PortfolioContext;
