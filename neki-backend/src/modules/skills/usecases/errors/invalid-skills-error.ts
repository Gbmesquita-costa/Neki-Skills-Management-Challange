class InvalidSkillsError extends Error {
  constructor() {
    super("Skills não encontradas");
  }
}

export { InvalidSkillsError };
