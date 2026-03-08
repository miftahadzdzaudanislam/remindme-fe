import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";
import { useNavigate } from "react-router-dom";

const TIMEOUT = 30 * 60 * 1000;

export const useInactivityLogout = () => {
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    let timer;

    const logout = async () => {
      await supabase.auth.signOut();
      alert("Session habis karena tidak ada aktivitas");
      navigate("/login");
    };

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(logout, TIMEOUT);
    };

    ["mousemove", "click", "keypress", "scroll"].forEach((event) =>
      window.addEventListener(event, resetTimer),
    );

    resetTimer();

    return () => {
      clearTimeout(timer);
      ["mousemove", "click", "keypress", "scroll"].forEach((event) =>
        window.removeEventListener(event, resetTimer),
      );
    };
  }, [navigate]);

  return { authLoading };
};
