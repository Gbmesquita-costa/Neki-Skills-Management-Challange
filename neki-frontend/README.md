# Sistema de Gestão de Skills - Frontend

Este é o frontend do projeto de Sistema de Gestão de Skills, desenvolvido em Next.js. A aplicação contempla as seguintes funcionalidades:

## Funcionalidades

### 1. Tela de Login

- **Campo de Login**
- **Campo de Senha**
- **Botão de visualizar Senha**
- **Checkbox de Gravar Senha**
  - Caso o usuário marque essa opção, armazenar no `localStorage` para que no próximo acesso já apareça preenchido. Caso desmarque, limpar o `localStorage`.
- **Botão de Entrar**
  - Ao clicar, deve chamar o endpoint de Login.
  - Redirecionar para a Home caso o login esteja correto.
- **Botão de Cadastrar-se**

### 2. Tela de Cadastro

- **Campo de Login**
- **Campo de Senha**
- **Campo de Confirmar Senha**
- **Botões para visualizar as senhas digitadas**
- **Botão de Salvar**
  - Deve validar se a Senha e Confirmar Senha são iguais.
  - Ao clicar, deve chamar o endpoint de Cadastro.
  - Exibir uma mensagem de cadastro realizado com sucesso.

### 3. Tela Home

- **Exibir lista de Skills que o usuário adicionou**
  - A lista será composta pela imagem (url), nome da skill, nível (versão) e descrição.
  - O nível deve ser possível editar diretamente na lista.
  - Também deve ter um botão de excluir a Skill da Lista.
- **Botão de Adicionar Skill**
  - Ao clicar no botão, deve abrir uma modal de cadastro. Nessa modal terá:
    - Uma combo para o usuário escolher a skill.
      - O conteúdo dessa combo será retornado de um endpoint.
    - Botão de Salvar
    - Botão de Cancelar
- **Botão de Logout**

### 4. Segurança

- Não permitir o usuário acessar a página Home sem estar logado.

### 5. Layout

- Caprichar no layout, pois o design também será avaliado.

### 6. Repositório

- O projeto deve ser compartilhado no GitHub em um repositório público.

## Tecnologias Utilizadas

- **Next.js**: Framework React para aplicações web.
- **React**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática.
- **Axios**: Cliente HTTP baseado em Promises.
- **Zustand**: Biblioteca para gerenciamento de estado.
- **React Hook Form**: Biblioteca para gerenciamento de formulários.
- **Yup**: Biblioteca de validação de esquemas.
- **Styled Components**: Biblioteca para estilização de componentes.

## Instalação e Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
