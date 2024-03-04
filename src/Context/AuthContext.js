import { useState, useEffect, createContext } from "react";
import axiosInstance from "../Utils/AxiosInstance.js";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user === null) {
      fetchUserData();
    }
  }, [user]);

  useEffect(() => {
    if (!user || user === null) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("user/signed-in-user");
      setUser(response.data.user);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await axiosInstance.get("user/sign-out");
    setUser(null);
    navigate('/')
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        setUser,
        signOut,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};