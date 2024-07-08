import { inject, injectable } from "tsyringe";

import { ISkillsRepository } from "../../repositories/ISkills-repository";
import { InvalidCreateSkillsError } from "../errors/invalid-create-skills-error";

@injectable()
class CreateSkillsUseCase {
  constructor(
    @inject("SkillsRepository")
    private skillsRepository: ISkillsRepository,
  ) {}

  async execute(): Promise<void> {
    const skills = [
      {
        name: "React.js",
        description: `
          React.js é uma biblioteca JavaScript para construção de interfaces de usuário, desenvolvida pelo Facebook. 
          Focada em uma abordagem declarativa e baseada em componentes, React permite a criação de aplicações web rápidas, escaláveis e de fácil manutenção. 
          Utilizando a técnica de renderização eficiente chamada de Virtual DOM, React melhora o desempenho das aplicações, atualizando apenas os componentes 
          que realmente mudaram. Com uma vasta comunidade e um ecossistema rico de bibliotecas e ferramentas, React é amplamente utilizado em projetos modernos, 
          desde pequenos sites até aplicações empresariais complexas.
        `,
        imageUrl:
          "https://www.shareicon.net/data/512x512/2016/08/01/640324_logo_512x512.png",
      },
      {
        name: "Node.js",
        description: `
          Node.js é um ambiente de execução JavaScript assíncrono orientado a eventos, construído sobre o motor V8 do Google Chrome. 
          Node.js permite que os desenvolvedores criem aplicativos de rede escaláveis e de alto desempenho, utilizando JavaScript no servidor. 
          Com sua arquitetura baseada em eventos e seu modelo de I/O não bloqueante, Node.js é ideal para aplicações em tempo real, como chats, 
          serviços de streaming e APIs RESTful. Além disso, a vasta quantidade de pacotes disponíveis no npm (Node Package Manager) facilita a 
          construção e a implementação de aplicativos robustos e complexos.
        `,
        imageUrl:
          "https://cdn.icon-icons.com/icons2/2415/PNG/512/nodejs_plain_wordmark_logo_icon_146410.png",
      },
      {
        name: "Python",
        description: `
          Python é uma linguagem de programação de alto nível, interpretada e de propósito geral, conhecida por sua simplicidade e legibilidade. 
          Com uma sintaxe clara e intuitiva, Python facilita o desenvolvimento rápido e eficiente de projetos, desde scripts simples até sistemas complexos. 
          Python é amplamente utilizado em diversas áreas, incluindo desenvolvimento web, análise de dados, inteligência artificial, automação e ciência computacional. 
          Sua vasta biblioteca padrão e o suporte ativo da comunidade tornam Python uma escolha popular entre desenvolvedores iniciantes e experientes, garantindo 
          soluções robustas e escaláveis para uma variedade de desafios tecnológicos.
        `,
        imageUrl:
          "https://i.pinimg.com/736x/92/60/dd/9260dd459aa4566cfa25e86a3f10ea1b.jpg",
      },
    ];

    for (const skill of skills) {
      const existingSkill = await this.skillsRepository.getSkillByName(
        skill.name,
      );

      if (existingSkill) {
        throw new InvalidCreateSkillsError();
      }
    }

    await this.skillsRepository.createSkills(skills);
  }
}

export { CreateSkillsUseCase };
