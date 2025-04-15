import React, {createContext, useState, useEffect, ReactNode, useContext} from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import User from "../types/user";

// Definición del contexto
interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (data: Omit<User, "_id">) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Componente proveedor
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Register
  const register = async (userData: Omit<User, "_id">) => {
    try {
      await axiosInstance.post(`http://localhost:3001/auth/register`, userData);
    } catch (err) {
      console.error("Error al registrarse", err);
      throw err;
    }
  };

  // Login
  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post(`http://localhost:3001/auth/login`, {
        email,
        password
      });

      const token = response.data.accessToken;
      if (token) {
        localStorage.setItem("AccessToken", token);

        const userRes = await axiosInstance.get(`http://localhost:3001/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(userRes.data);
        navigate("/home");
      }
    } catch (err) {
      console.error("Error al iniciar sesión", err);
      throw err;
    }
  };
  
  const logout = async () => {
    console.log("Logout iniciado...");
  
    try {
      await axiosInstance.post("/auth/logout"); // <- El backend elimina la cookie
      console.log("Refresh token eliminado en el servidor.");
    } catch (error) {
      console.error("Error al cerrar sesión en el servidor:", error);
    } finally {
      localStorage.removeItem("AccessToken");
      setUser(null);
      navigate("/login");
      console.log("Usuario cerrado sesión en el cliente.");
    }
  };
  

  // Fetch user con token
  useEffect(() => {
    const token = localStorage.getItem("AccessToken");

    const fetchUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        let accessToken = token;

        const res = await axiosInstance.get(`http://localhost:3001/user/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setUser(res.data);
      } catch (error) {
        console.error("Error al obtener el usuario", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout  }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("AuthContext debe usarse dentro de un AuthProvider");
  }
  return context;
};
