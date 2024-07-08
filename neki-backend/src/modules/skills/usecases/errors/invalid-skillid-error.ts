class InvalidSkillIdError extends Error {
  constructor() {
    super("Esta skill não existe");
  }
}

export { InvalidSkillIdError };
