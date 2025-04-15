import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

interface AuthContextType {
  user: any;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    }

    if (token && !user) {
      axios
        .get("https://api.escuelajs.co/api/v1/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setUser(response.data);
          localStorage.setItem("user", JSON.stringify(response.data));
        })
        .catch(() => {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user");
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(
        "https://api.escuelajs.co/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("access_token", res.data.access_token);
      localStorage.setItem("refresh_token", res.data.refresh_token);

      const profile = await axios.get(
        "https://api.escuelajs.co/api/v1/auth/profile",
        {
          headers: { Authorization: `Bearer ${res.data.access_token}` },
        }
      );

      setUser(profile.data);
      localStorage.setItem("user", JSON.stringify(profile.data));

      return true;
    } catch (err) {
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    try {
      await axios.post("https://api.escuelajs.co/api/v1/users/", {
        name,
        email,
        password,
        avatar: "https://api.lorem.space/image/face?w=640&h=480",
      });
      return await login(email, password);
    } catch (err) {
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
