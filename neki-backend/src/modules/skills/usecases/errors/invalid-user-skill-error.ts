class InvalidUserSkillError extends Error {
  constructor() {
    super("Não foi possível encontrar a skill do usuário");
  }
}

export { InvalidUserSkillError };
