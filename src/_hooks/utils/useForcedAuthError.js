import { useEffect, useState } from "react";

export default function useForcedAuthError() {
  const [forcedError, setForcedError] = useState(
    () => sessionStorage.getItem("auth_error") || ""
  );

  useEffect(() => {
    if (forcedError) {
      sessionStorage.removeItem("auth_error");
    }
  }, [forcedError]);

  const clearForcedError = () => setForcedError("");

  return {
    forcedError,
    setForcedError,
    clearForcedError,
  };
}