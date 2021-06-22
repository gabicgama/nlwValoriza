## :rocket: NLW Together #6

O NLW é um evento online e gratuito, oferecido pela [Rocketseat](https://rocketseat.com.br/), com duração de uma semana. Durante o evento, diversos conteúdos de programação, com projetos para serem desenvolvidos, são disponibilizados para a comunidade. Todo o conteúdo do evento é divido em diferentes trilhas de aprendizado, cada uma abordando uma tecnologia diferente.

## :pushpin: Sobre o projeto

Neste projeto, esta sendo desenvolvido uma aplicação back-end da trilha `Node.js`.

O `NLW VALORIZA` é uma aplicação onde será possível fazer e retrubuir elogios. Pode ser aplicado por exemplo em um ambiente de trabalhado, fazendo elogias aos colegas.

Esse projeto contemplará:

- Cadastros de usuários
- Cadastros de tags (possíveis elogios)
- Cadastros de elogios
- Autenticação de usuário
  - Gerar token JWT
  - Validar usuários logados
- Listar usuários, tags e elogios

## :zap: Tecnologias utilizadas

- Node.js
-

## :desktop_computer: Configuração do ambiente

As instruções de preparação do ambiente estão neste [Notion](https://www.notion.so/Configura-es-do-ambiente-45e12d2ced17465cabbd81dcbd53576d).

## :pushpin: Criando um projeto node

Primeiro abra o terminal dentro da pasta de onde o projeto será criado. Em seguida iremos criar o projeto utilizando o `npm` com o seguinte comando:

```
npm init
```

Esse comando vai criar o arquivo `package.json`, que é onde está toda a configuração do projeto, includindo, nome, versão, descrição, scripts a serem executados, licença, etc.

Após executar o `npm init`, o npm vai perguntar algumas informações básicas para montar o package.json.

Mais intruções podem ser contradas nesta [fonte](https://dicasdejavascript.com.br/como-criar-um-projeto-nodejs-com-npm/).

## :pushpin: Instalação de dependências e configurações

### TypeScript

https://www.npmjs.com/package/typescript

```
npm i typescript -D
npx tsc --init
```

Alterar a propriedade `strict` para `false` no arquivo `tsconfig.ts` que foi criado.

### Dependência de desenvolvimento

Será uma biblioteca responsável por converter o código em `typescript` para uma forma que o `Node` consiga entender.

```
npm i ts-node-dev -D
```

Acrescentar o script no `package.json` para executar a aplicação:

```json
"scripts": {
    "dev": "ts-node-dev src/server.ts",
  }
```

Agora a aplicação será executada com o comando:

```
npm run dev
```

### Express

https://expressjs.com/pt-br/

```
npm i express
npm i @types/express -D
```

### Typeorm + Postgres

https://typeorm.io/

```
npm install typeorm --save
npm install reflect-metadata --save
npm install pg --save
```

Adicionar o seguinte import no arquivo `server.ts`:

```ts
import "reflect-metadata";
```

Para configurar a conexão com o `Postgres`, usamos um arquivo `ormconfig.json`:

```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "admin",
  "database": "nlwvaloriza"
}
```

A conexão é iniciada definindo um arquivo de configuração dentro de `src/database/index.ts`:

```ts
import { createConnection } from "typeorm";
createConnection();
```

Em seguida adicionamos o import no `server.ts`:

```ts
import "./database";
```

## Adicionando migrations

Dentro de `ormconfig.json`iremos adicionar:

```json
  "migrations": ["src/database/migrations/*.ts"],
  "cli": {
    "migrationsDir": "src/database/migrations"
  }
```

Adicionar o script em `package.json`:

```json
  "scripts": {
    "typeorm": "ts-node-dev ./node_modules/typeorm/cli.js"
  }
```

Instalar `ts-node` globalmente, caso os comandos de criar migration abaixo não funcionarem:

```
npm install -g ts-node
```

Para criar migration:

```
npm rum typeorm migration:create -n CreateUser
```

Ou então:

```
npx typeorm migration:create -n CreateUser
```

Para executar uma migration, utilizar o comando:

```
npm run typeorm migration:run
```

Para reverter um migration:

```
npm run typeorm migration:revert
```

### Criando entidades com typeorm

Adicionar o local onde as entidades serão criadas no arquivo `ormconfig.json`:

```json
  "entities": ["src/entities/*.ts"],
  "cli": {
    "entitiesDir": "src/entities"
  }
```

Para criar a entidade:

```
npx typeorm entity:create -n User
```

Para trabalhar com decorators, será necessário descomentar a seguinte parte do código no arquivo `tsconfig.json`:

```json
"emitDecoratorMetadata": true,
"experimentalDecorators": true,
```

Também descomentar a seguinte propriedade e alterar para `false`, para que não fique apontando erro de inicialização de atributos, já que a inicialização será feita de uma outra forma.

```json
"strictPropertyInitialization": false
```
