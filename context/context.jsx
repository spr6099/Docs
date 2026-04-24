import { createContext, useContext, useEffect, useState } from "react";
import { loginAPI, logoutAPI } from "../services/auth_services";
import { v4 as uuidv4 } from "uuid";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState(null);
  const [deviceId, setDeviceId] = useState(null);

  //   Load token + deviceId ONCE
  const initAuth = async () => {
    const token = localStorage.getItem("accessToken");
    let storedDeviceId = localStorage.getItem("deviceId");

    if (!storedDeviceId) {
      storedDeviceId = "web-" + uuidv4();
      localStorage.setItem("deviceId", storedDeviceId);
    }

    if (token) {
      setAccessToken(token);
    }

    setDeviceId(storedDeviceId);
    setLoading(false);
  };

  useEffect(() => {
    initAuth();
  }, []);

  const login = async (payload) => {
    const res = await loginAPI({ ...payload, deviceId });
    const token = res?.data?.accessToken;

    localStorage.setItem("accessToken", token);
    setAccessToken(token);
    return res;
  };

  const logout = async () => {
    const res = await logoutAPI({ deviceId });
    //  remove only accessToken (keep deviceId)
    localStorage.removeItem("accessToken");

    setAccessToken(null);
    return res;
  };

  // ✅ Derived state
  const isAuthenticated = !!accessToken;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
