import { useEffect, useState } from "react";

export function useLoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    const storedPassword = localStorage.getItem("remembered-password");
    const storedRememberMe = localStorage.getItem("remember-me");

    if (storedPassword && storedRememberMe === "true") {
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePassword = (password: string) => {
    setPassword(password);
  };

  const handleRememberMeChange = (checked: boolean) => {
    setRememberMe(checked);

    if (checked) {
      localStorage.setItem("remembered-password", password);
      localStorage.setItem("remember-me", "true");

      return;
    }

    localStorage.removeItem("remembered-password");
    localStorage.removeItem("remember-me");
  };

  return {
    togglePasswordVisibility,
    handleRememberMeChange,
    handlePassword,
    showPassword,
    rememberMe,
    password,
  };
}
