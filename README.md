# Tabela do Campeonato - TFC

Aplicação realizada enquanto aluno da [Trybe](https://www.betrybe.com/) para reforçar os conhecimentos sobre [Typescript](https://www.typescriptlang.org/), [API RESTful](https://blog.betrybe.com/desenvolvimento-web/api-rest-tudo-sobre/), [POO](https://blog.betrybe.com/tecnologia/poo-programacao-orientada-a-objetos/#:~:text=A%20programa%C3%A7%C3%A3o%20orientada%20a%20objetos,que%20existe%20s%C3%A3o%20os%20objetos.),
[SOLID](https://blog.betrybe.com/linguagem-de-programacao/solid-cinco-principios-poo/), entre outras.

O projeto "Tabela do Campeonato" é um site informativo sobre partidas e classificações de futebol. Durante o desenvolvimento, minha responsabilidade foi criar uma API e integrar as aplicações através de Docker Compose, para que elas funcionem com um banco de dados. Utilizamos modelagem de dados com Sequelize para construir um back-end dockerizado.

Para adicionar uma partida, é necessário ter um token de autenticação válido. Isso significa que é preciso estar logado para realizar quaisquer alterações na tabela de partidas. Utilizamos modelagem de dados com Sequelize para criar relacionamentos entre as tabelas "teams" e "matches", permitindo assim a atualização das partidas de forma precisa e eficiente.

Com esse projeto, é possível verificar a tabela geral do campeonato, filtrar pela classificação de jogos em casa e fora de casa, além de adicionar e atualizar partidas (desde que esteja logado). Além disso, você pode experimentar o site com o usuário `user@user.com` e a senha `secret_user` ou como administrador com o email `admin@admin.com` e a senha `secret_admin` para ter algumas permissões adicionais.

Para garantir a qualidade e confiabilidade da API construída, foram realizados testes automatizados utilizando as bibliotecas [Mocha](https://mochajs.org/), [Sinon](https://sinonjs.org/), [Chai](https://www.chaijs.com/) e [Jest](https://jestjs.io/). Essas ferramentas permitem a criação de testes unitários, de integração e de aceitação, possibilitando a validação do comportamento da aplicação em diferentes níveis.

<br>

<details>
  <summary><strong>Rotas</strong></summary><br />
 
#### Login
- **GET** `/validate`: Utiliza o método `tokenControllerValidation` do controlador de login para validar um token de autenticação.
- **POST** `/`: Utiliza o método `loginValidation` do controlador de login para validar as credenciais de login enviadas e, em seguida, o método `loginValidation` para efetuar o login.

#### Partidas
- **GET** `/`: Utiliza o método `getMatches` do controlador de partidas para recuperar todas as partidas.
- **POST** `/`: Utiliza o método `createMatch` do controlador de partidas para criar uma nova partida.
- **PATCH** `/:id/finish`: Utiliza o método `matchFinished` do controlador de partidas para marcar uma partida como finalizada.
- **PATCH** `/:id`: Utiliza o método `updateMatch` do controlador de partidas para atualizar uma partida existente.

#### Times
- **GET** `/`: Utiliza o método `getAllTeams` do controlador de times para recuperar todos os times.
- **GET** `/:id`: Utiliza o método `getTeamById` do controlador de times para recuperar um time específico pelo ID.

#### Tabelas
- **GET** `/`: Utiliza o método `leaderboard` do controlador de tabelas para recuperar a tabela geral.
- **GET** `/home`: Utiliza o método `homeLeaderboard` do controlador de tabelas para recuperar a tabela de jogos em casa.
- **GET** `/away`: Utiliza o método `awayLeaderboard` do controlador de tabelas para recuperar a tabela de jogos fora de casa.
  
<hr>
</details>

<br>

<details>
  <summary><strong>Como instalar a Tabela de Campeonato</strong></summary><br />

## Instalação
 
<hr>

<details>
<summary><strong> ⚠️ Configurações mínimas para execução do projeto</strong></summary><br />

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix (Preferencialmente)
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:
  * Use esse [link de referência para realizar a instalação corretamente no ubuntu](https://app.betrybe.com/learn/course/5e938f69-6e32-43b3-9685-c936530fd326/module/94d0e996-1827-4fbc-bc24-c99fb592925b/section/5987fa2d-0d04-45b2-9d91-1c2ffce09862/day/2f1a5c4d-74b1-488a-8d9b-408682c93724/lesson/b883b81d-21f6-4b60-aa62-8508f6017ea0);
  * Acesse o [link da documentação oficial com passos para desinstalar](https://docs.docker.com/compose/install/#uninstallation) caso necessário.

</details>
 
### Rodando a aplicação via [Docker](https://www.docker.com/)

> - :warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.

> - :warning: Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima

> - :warning: Se você se deparar com o erro abaixo, quer dizer que sua aplicação já esta utilizando a `porta 3000`, seja com outro processo do Node.js (que você pode parar com o comando `killall node`) ou algum container! Neste caso você pode parar o container com o comando `docker stop <nome-do-container>`

<br>

- Clone o repositório `git@github.com:Rafael-Souza-97/tabela-do-campeonato.git`:

```bash
git clone git@github.com:Rafael-Souza-97/tabela-do-campeonato.git
```

<br>

- Entre na pasta do repositório que você acabou de clonar:

```bash
cd tabela-do-campeonato
```

- Instale as depëndencias, caso necessário, com `npm install` (fora do container):
> - Esse serviço irá instalar as dependências do Front End e do Back End`.

```bash
npm install
```

<br>

- Rode o serviço `node` com o comando `npm run compose:up:dev -- --build`:


 > - Esse serviço irá inicializar três containers chamados `app_backend`, `app_frontend` e `mysql:8.0.21`.
 > - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.
 
```bash
npm run compose:up:dev -- --build
```

<br>

- Use o comando `docker exec -it app_backend sh` para acessar o container `app_backend`:

 > - Ele te dará acesso ao terminal interativo do container do backend criado pelo compose, que está rodando em segundo plano.

```bash
docker exec -it app_backend sh
```

<br>

 > A aplicação é executada com nodemon, inicializado junto ao container;
 
 <br>

- Para rodar os testes unitários e testes de integração localmente, acesse o container `app_backend` com o comando `docker exec -it app_backend sh`, e em seguida, rode o serviço de cobertura de testes com o comando `npm run test:coverage`:

 
```bash
docker exec -it app_backend sh
```

```bash
npm run test:coverage
```

<hr>
</details>
  
<br>
  
## Autor

- [Rafael Souza](https://github.com/Rafael-Souza-97)

## Referências

 - [Trybe](https://www.betrybe.com/) - (Base do Front End, consumo de API e estilizaçào)

## Tecnologias / Ferramentas utilizadas

- [Typescript](https://www.typescriptlang.org/)
- [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
- [Node](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [API RESTful](https://blog.betrybe.com/desenvolvimento-web/api-rest-tudo-sobre/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [MySQL Workbench](https://www.mysql.com/products/workbench/)
- [Sequelize](https://sequelize.org/)
- [JWT](https://auth0.com/resources/ebooks/jwt-handbook?utm_content=latamptbrazilgenericauthentication-jwthandbook-jwthandbook&utm_source=google&utm_campaign=latam_mult_bra_all_ciam-all_dg-ao_auth0_search_google_text_kw_utm2&utm_medium=cpc&utm_id=aNK4z0000004ISoGAM&utm_term=json%20web%20token-c&gclid=Cj0KCQiAic6eBhCoARIsANlox86d1mgnR32Ojo_O7HQcmuTbch4oUFGFeAe5YcMjrVVTa3XlqlXDIGoaApm8EALw_wcB)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [POO](https://blog.betrybe.com/tecnologia/poo-programacao-orientada-a-objetos/#:~:text=A%20programa%C3%A7%C3%A3o%20orientada%20a%20objetos,que%20existe%20s%C3%A3o%20os%20objetos.)
- [SOLID](https://blog.betrybe.com/linguagem-de-programacao/solid-cinco-principios-poo/)
- [Thunder Client](https://www.thunderclient.com/)
- [Zoom](https://zoom.us/)
- [Slack](https://slack.com/intl/pt-br/)
- [ESLint](https://eslint.org/)
- [VsCode](https://code.visualstudio.com/)
- [Git](https://git-scm.com/) & [GitHub](https://github.com/)
- [Linux - Ubuntu](https://ubuntu.com/)

## Testes

- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- [Sinon](https://sinonjs.org/)
- [Jest](https://jestjs.io/)

## Infos Adicionais

- ###### Percentual de cumprimento de requisitos ([Trybe](https://www.betrybe.com/))- 100%
