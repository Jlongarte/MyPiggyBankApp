// src/hooks/useAuthSession.ts
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FIVE_DAYS_IN_MS = 5 * 24 * 60 * 60 * 1000;

export const useAuthSession = () => {
  const navigate = useNavigate();

  // Comprueba la validez de la sesión actual
  useEffect(() => {
    const session = localStorage.getItem("currentUser");
    const expiration = localStorage.getItem("sessionExpiration");

    if (session) {
      if (expiration) {
        if (Date.now() < parseInt(expiration, 10)) {
          navigate("/dashboard");
        } else {
          localStorage.removeItem("currentUser");
          localStorage.removeItem("sessionExpiration");
        }
      } else {
        navigate("/dashboard");
      }
    }
  }, [navigate]);

  // Guarda la nueva sesión al hacer login
  const saveSession = (user: any, rememberMe: boolean) => {
    const sessionData = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem("currentUser", JSON.stringify(sessionData));

    if (rememberMe) {
      localStorage.removeItem("sessionExpiration");
    } else {
      const expireTime = Date.now() + FIVE_DAYS_IN_MS;
      localStorage.setItem("sessionExpiration", expireTime.toString());
    }

    navigate("/dashboard");
  };

  return { saveSession };
};