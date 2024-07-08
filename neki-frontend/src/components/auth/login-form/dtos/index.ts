interface ValidationError {
  email?: string[];
  password?: string[];
}

interface LogInFormState {
  error?: ValidationError;
  message?: string;
  statusCode?: number;
}

interface LoginFormContainerProps {
  state: LogInFormState;
}

export type { LoginFormContainerProps, LogInFormState };
