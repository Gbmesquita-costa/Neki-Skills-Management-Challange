# Sistema de Gestão de Skills

Este é um projeto backend desenvolvido em Node.js que contempla as seguintes funcionalidades:

## Funcionalidades

1. **Serviço de Login**

   - Recebe login e senha e verifica se estão corretos com base no banco de dados.
   - A senha é criptografada.
   - Retorna um token para acesso aos demais serviços.

2. **Serviço de Cadastro**

   - Recebe login e senha para cadastro na base de dados.
   - A senha é armazenada criptografada.

3. **Serviço de Listagem de Skills**

   - Recebe o ID do usuário e retorna todas as skills associadas a ele e seus respectivos níveis.

4. **Serviço de Associar Skill**

   - Recebe o usuário, a skill e o nível para persistir na base de dados.

5. **Serviço de Atualizar Associação de Skill**

   - Recebe o ID da associação da skill e o nível para atualização na base de dados.

6. **Serviço de Excluir Associação de Skill**

   - Recebe o ID da associação da skill e exclui da base de dados.

7. **Segurança JWT**

   - Apenas o Serviço de Login é público. Os demais serviços são protegidos por JWT e acessados apenas com um token válido.

8. **Documentação automática com Swagger**
   - O projeto utiliza o Swagger para gerar documentação automática dos serviços.

## Requisitos Funcionais (RFs)

- [✔] Deve ser possível se cadastrar
- [✔] Deve ser possível se autenticar
- [✔] Deve ser possível obter o perfil de um usuário logado
- [✔] Deve ser possível listar as skills de um usuário
- [✔] Deve ser possível associar uma skill a um usuário
- [✔] Deve ser possível atualizar o nível de uma skill associada a um usuário
- [✔] Deve ser possível excluir a associação de uma skill a um usuário

## Regras de Negócio (RNs)

- [✔] O usuário não deve poder se cadastrar com um e-mail duplicado
- [✔] Apenas administradores podem criar novas skills no sistema

## Requisitos Não Funcionais (RNFs)

- [✔] A senha do usuário precisa estar criptografada
- [✔] Os dados da aplicação precisam estar persistidos em um banco de dados PostgreSQL
- [✔] O usuário deve ser identificado por um JWT (JSON Web Token)
- [✔] A documentação dos serviços deve ser gerada pelo Swagger

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript
- **Express**: Framework para criação de servidores web em Node.js
- **Prisma**: ORM para banco de dados
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática
- **JWT**: Autenticação e autorização baseada em token
- **BCrypt**: Biblioteca para criptografia de senhas
- **Swagger**: Ferramenta para documentação de APIs
- **PostgreSQL**: Banco de dados relacional

## Configuração do Banco de Dados

As tabelas do banco de dados estão definidas na pasta `prisma`. O arquivo de configuração do Docker Compose, localizado na pasta `infra` na raiz do projeto, sobe o banco de dados e a imagem do PostgreSQL.

## Instalação e Execução

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. Instale as dependências:

```bash
 npm install, yarn ...
```

3. Configure as variáveis de ambiente, crie um arquivo .env na raiz do projeto e configure as variáveis conforme o exemplo abaixo:

NODE_ENV="dev"

# User HTTP Request

HTTP_REQUEST="http://localhost:3000"

# Auth

JWT_SECRET="JWT_EXAMPLE"

# Database and PostgreSQL variables

DATABASE_URL="postgresql://neki:neki_password@localhost:5432/nekiapi?schema=public"

POSTGRES_USERNAME="POSTGRES_USERNAME_EXAMPLE"
POSTGRES_PASSWORD="POSTGRES_PASSWORD_EXAMPLE"
POSTGRES_DATABASE="POSTGRES_DATABASE_EXAMPLE"

4. Inicie o projeto:

```bash
 npm run dev, yarn dev ...
```

Este comando irá iniciar o Docker, criando um container com a imagem do PostgreSQL e configurando as variáveis de ambiente corretamente.

## Script Disponíveis

`dev`: Inicia o servidor em modo de desenvolvimento.
`start`: Inicia o servidor em modo de produção.
`build`: Compila o código TypeScript para JavaScript.
`services:up`: Sobe os serviços do Docker.
`services:down`: Derruba os serviços do Docker.
`services:stop`: Para os serviços do Docker.
`test:create-prisma-environment`: Cria o ambiente de testes do Prisma.
`test:install-prisma-environment`: Instala o ambiente de testes do Prisma.
`test`: Roda os testes unitários.
`test:watch`: Roda os testes unitários em modo watch.
`pretest:e2e`: Prepara o ambiente para testes de ponta a ponta.
`test:e2e`: Roda os testes de ponta a ponta.
`test:e2e:watch`: Roda os testes de ponta a ponta em modo watch.
`test:coverage`: Gera o relatório de cobertura de testes.
`test:ui`: Inicia a interface de usuário para os testes.
`lint:check`: Verifica se o código segue as regras de formatação.
`lint:fix`: Corrige as formatações de código

## Testes

Para rodar os testes end-to-end, execute primeiro:

```bash
 npm run test:e2e, yarn test:e2e ...
```

Este comando irá executar os scripts necessários para preparar o ambiente de testes:

```bash
 "pretest:e2e": "run-s test:create-prisma-environment test:install-prisma-environment"
```

# Middlewares

A aplicação possui os seguintes middlewares:

1. **ensure-authenticated**

   - Verifica se o usuário está autenticado com um token JWT.
   - Adiciona o role do usuário (admin ou user) ao request.

2. **login-rate-limiter**

   - Limita o número de tentativas de login utilizando express-rate-limit.

3. **verify-user-role**

   - Verifica o nível de acesso do usuário (admin ou user) para determinar se ele tem permissão para acessar determinadas rotas.

## Rotas

A documentação completa das rotas está disponível no Swagger, acessível em:

```bash
 http://localhost:3333/api-docs
```
