
import { createContext, useState, useContext, ReactNode, useEffect } from "react";

export type UserRole = "patient" | "driver" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  profilePic?: string;
}

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Mock data for demonstration
  const mockUsers = [
    { id: "1", email: "patient@example.com", password: "password", name: "John Patient", role: "patient" as UserRole },
    { id: "2", email: "driver@example.com", password: "password", name: "Mike Driver", role: "driver" as UserRole },
    { id: "3", email: "admin@example.com", password: "password", name: "Sarah Admin", role: "admin" as UserRole },
  ];

  const login = async (email: string, password: string) => {
    // Mock login for now - would be replaced with actual auth
    const user = mockUsers.find(user => user.email === email && user.password === password);
    
    if (!user) {
      throw new Error("Invalid email or password");
    }
    
    const { password: _, ...userData } = user;
    setCurrentUser(userData);

    // Store in localStorage for persistence
    localStorage.setItem("arogya_user", JSON.stringify(userData));
    
    return Promise.resolve();
  };

  const signup = async (email: string, password: string, name: string, role: UserRole) => {
    // Mock signup - would be replaced with actual auth
    const existingUser = mockUsers.find(user => user.email === email);
    
    if (existingUser) {
      throw new Error("Email already in use");
    }
    
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      email,
      name,
      role,
    };
    
    setCurrentUser(newUser);
    localStorage.setItem("arogya_user", JSON.stringify(newUser));
    
    return Promise.resolve();
  };

  const logout = async () => {
    setCurrentUser(null);
    localStorage.removeItem("arogya_user");
    return Promise.resolve();
  };

  // Check for existing session on load - using useEffect instead of useState
  useEffect(() => {
    const storedUser = localStorage.getItem("arogya_user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const value = {
    currentUser,
    isAuthenticated: currentUser !== null,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
