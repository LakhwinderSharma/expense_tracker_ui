import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example state for user

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    // ... other logout logic
  };

  const authContextValue = { user, login, logout };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
