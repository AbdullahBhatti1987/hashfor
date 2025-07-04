"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(null);

  // Set token in state and localStorage, decode and set user
  const setToken = (jwtToken) => {
    if (jwtToken) {
      localStorage.setItem("authToken", jwtToken);
      setTokenState(jwtToken);
      try {
        const decoded = jwtDecode(jwtToken);
        if (decoded.id && !decoded._id) {
          decoded._id = decoded.id;
        }
        setUser(decoded);
        // console.log("[AuthContext] setUser called with:", decoded);
      } catch (e) {
        setUser(null);
        // console.error("[AuthContext] Error decoding token:", e);
      }
    } else {
      localStorage.removeItem("authToken");
      setTokenState(null);
      setUser(null);
    }
  };

  // On mount, load token from localStorage and decode
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    // console.log("[AuthContext] storedToken from localStorage:", storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 