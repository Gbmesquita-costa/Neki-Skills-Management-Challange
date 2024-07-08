class InvalidCredentialsError extends Error {
  constructor() {
    super("E-mail ou senha inválidos");
  }
}

export { InvalidCredentialsError };
