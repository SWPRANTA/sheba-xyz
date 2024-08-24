import { createContext } from "react";
import useCredentials from "../hooks/useCredentials";
type User = {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  type Users = {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  type Category={
    _id: string;
    name: string;
  }
type AuthContextType = {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  users: Users[];
  setUsers: React.Dispatch<React.SetStateAction<Users[]>>;
  logOut: () => void;
};

export const AuthContext = createContext<AuthContextType|null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const allContext = useCredentials();
  return (
    <AuthContext.Provider value = {allContext}>{children}</AuthContext.Provider>
  )
};

export default AuthProvider;
