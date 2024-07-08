import { useState } from "react";

export function useSignupForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!confirmPassword);
  };

  return {
    showPassword,
    confirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
  };
}
