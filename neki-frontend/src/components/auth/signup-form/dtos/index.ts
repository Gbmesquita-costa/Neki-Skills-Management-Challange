interface ValidationError {
  email?: string[];
  password?: string[];
  confirm_password?: string[];
}

interface SignUpFormState {
  validationError?: ValidationError;
  message?: string;
  statusCode?: number;
}

interface SignupFormContainerProps {
  state: SignUpFormState;
}

export type { SignupFormContainerProps, SignUpFormState };
