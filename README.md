# Campeonato Brasileiro - TFC

Aplicação realizada enquanto aluno da [Trybe](https://www.betrybe.com/) para reforçar os conhecimentos sobre 
[programação orientada a objetos](https://blog.betrybe.com/tecnologia/poo-programacao-orientada-a-objetos/#:~:text=A%20programa%C3%A7%C3%A3o%20orientada%20a%20objetos,que%20existe%20s%C3%A3o%20os%20objetos.),
[SOLID](https://blog.betrybe.com/linguagem-de-programacao/solid-cinco-principios-poo/), [Typescript](https://www.typescriptlang.org/), entre outras.

### Estrutura

A aplicação possui as seguintes rotas para realizar as operações de CRUD de posts:

- `GET` /posts ou /user: Retorna a lista de todos os posts existentes no banco de dados
- `GET` /posts/search: Retorna o post pesquisado através de uma query
- `GET` /posts/:id ou /user/:id : Retorna o post com o id especificado na rota
- `POST` /posts ou /user: Cria um novo post com os dados enviados no corpo da requisição
- `PUT` /posts/:id ou /user/:id : Atualiza o post com o id especificado na rota com os dados enviados no corpo da requisição
- `DELETE` /posts/:id ou /user/:id : Exclui o post com o id especificado na rota

<br>

<details>
  <summary><strong>Como instalar o Cameponato Brasileiro</strong></summary><br />

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

- Clone o repositório `git@github.com:Rafael-Souza-97/campeonato-brasileiro.git`:

```bash
git clone git@github.com:Rafael-Souza-97/campeonato-brasileiro.git
```

<br>

- Entre na pasta do repositório que você acabou de clonar:

```bash
cd campeonato-brasileiro
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

<br>
<hr>

<br>

</details>
  
## Autor

- [Rafael Souza](https://github.com/Rafael-Souza-97)

## Referências

 - [Trybe](https://www.betrybe.com/) - (base do Front End, consumo da API e estilizaçào)

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
