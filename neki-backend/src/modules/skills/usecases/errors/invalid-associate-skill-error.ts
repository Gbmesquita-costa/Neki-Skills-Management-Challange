class InvalidAssociateSkillError extends Error {
  constructor() {
    super("Skill já associada");
  }
}

export { InvalidAssociateSkillError };
