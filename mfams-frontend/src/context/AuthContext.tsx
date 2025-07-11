import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState("");

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);

    const decoded: any = jwtDecode(token);

   
    const userRole =
      decoded.role || decoded.roles || decoded.authorities?.[0] || "USER";

    setRole(userRole);
    console.log("Logged in as role:", userRole);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setRole("");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
