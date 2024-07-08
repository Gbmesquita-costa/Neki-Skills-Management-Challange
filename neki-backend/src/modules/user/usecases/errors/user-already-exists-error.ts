class UserAlreadyExistsError extends Error {
  constructor() {
    super("Este e-mail já existe. Por favor, cadastre-se com outro e-mail");
  }
}

export { UserAlreadyExistsError };
