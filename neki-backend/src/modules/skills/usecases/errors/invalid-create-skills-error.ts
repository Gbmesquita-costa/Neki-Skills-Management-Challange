class InvalidCreateSkillsError extends Error {
  constructor() {
    super("Skills já cadastradas");
  }
}

export { InvalidCreateSkillsError };
