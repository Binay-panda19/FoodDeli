import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check auth on refresh
  const checkAuth = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data.data);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      setUser(res.data.data);
      toast.success("Login successful");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return false;
    }
  };

  // Register
  const register = async (data) => {
    try {
      const res = await API.post("/auth/register", data);
      setUser(res.data.data);
      toast.success("Account created successfully");
      return true;
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
      return false;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await API.post("/auth/logout");
      setUser(null);
      toast.success("Logged out");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
