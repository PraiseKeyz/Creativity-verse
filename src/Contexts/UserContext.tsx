import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the user object
export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string; // e.g., "admin" | "user"
};

// Define context state
type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};

// Create Context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // clear from storage
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook to use UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};