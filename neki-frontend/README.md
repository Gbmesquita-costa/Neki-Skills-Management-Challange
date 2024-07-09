# Sistema de Gestão de Skills - Frontend

Este é o frontend do projeto de Sistema de Gestão de Skills. A aplicação contempla as seguintes funcionalidades:

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
- **Zustand**: Biblioteca para gerenciamento de estado.
- **Shadcn-UI**: Biblioteca para componentes estilizados.
- **Tailwind**: Biblioteca para estilização de componentes.

## Instalação e Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/Gbmesquita-costa/Neki-Skills-Management-Challange.git
   ```

2. Instale as dependências:

```bash
 npm install, yarn ...
```

3. Configure as variáveis de ambiente, crie um arquivo .env na raiz do projeto e configure as variáveis conforme o exemplo abaixo:

**NEXT_PUBLIC_HTTP_REQUEST="http://localhost:3333"**

4. Execute a aplicação:

```bash
 npm run dev, yarn dev ...
```

## Estrutura de Pastas do Projeto

A estrutura de pastas do projeto frontend (neki-frontend) está organizada da seguinte forma:

```shell
neki-frontend
├── public
│   ├── bg
│   ├── logo
│   └── ...
├── src
│   ├── actions
│   │   ├── cookies
│   │   ├── create-skills
│   │   ├── login-user
│   │   ├── logout-user
│   │   ├── revalidate
│   │   └── signup-user
│   ├── app
│   │   ├── auth
│   │   │   ├── login
│   │   │   └── signup
│   │   ├── home
│   │   │   ├── @admin
│   │   │   └── @user
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   ├── page.tsx
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components
│   │   ├── auth
│   │   ├── home
│   │   ├── layouts
│   │   ├── theme
│   │   └── ui
│   ├── lib
│   │   ├── utils.ts
│   │   └── decode-jwt
│   ├── providers
│   ├── schemas
│   ├── toasts
│   ├── zustand
│   └── middleware.ts
```

## Observações Adicionais

Para que um usuário comum possa escolher uma skill, as skills devem ser criadas por um administrador. O administrador tem a permissão de criar novas skills no sistema.

https://github.com/Gbmesquita-costa/Neki-Skills-Management-Challange/assets/95727524/d8ae702d-4b4c-4b14-845d-d569a6a59d8b