import { createContext, useContext, useEffect, useState } from "react";
import { loginAPI, logoutAPI } from "../api/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null,
  );

  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  console.log("user", user);
  console.log("accessToken", accessToken);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (data) => {
    try {
      const res = await loginAPI(data);
      console.log("res", res);
      setUser(res?.data?.user);
      setAccessToken(res.data.accessToken);
      return res;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutAPI(); // call backend
    } catch (err) {
      console.log(err);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setUser(null);
      setAccessToken(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, user, isAuthenticated: !!accessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);
