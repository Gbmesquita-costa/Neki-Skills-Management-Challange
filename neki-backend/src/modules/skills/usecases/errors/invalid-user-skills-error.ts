class InvalidUserSkillsError extends Error {
  constructor() {
    super("Skills do usuário não encontradas");
  }
}

export { InvalidUserSkillsError };
