import { useState, createContext, ReactNode } from "react";

export const LoggedInContext = createContext<{ isLoggedIn: boolean; setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>> } | undefined>(undefined);

type LoggedInStateProps = {
  children: ReactNode;
};

const LoggedInState = ({ children }: LoggedInStateProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <LoggedInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoggedInContext.Provider>
  );
};

export default LoggedInState;
