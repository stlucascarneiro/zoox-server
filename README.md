<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Documentação do Backend - Sistema de Gerenciamento de Clientes

Este documento descreve a arquitetura do backend da aplicação de Sistema de Gerenciamento de Clientes, incluindo as tecnologias utilizadas e uma explicação da arquitetura padrão do NestJS.

#### Tecnologias Utilizadas


###### NestJS

NestJS é um framework para construção de aplicativos Node.js eficientes e escaláveis. Ele utiliza TypeScript como linguagem principal e adota uma arquitetura modular e orientada a componentes.
- **Arquitetura Modular**: O NestJS promove uma arquitetura modular, dividindo a aplicação em módulos, cada um com sua própria responsabilidade e funcionalidades.
- **Injeção de Dependência**: Facilita a criação de componentes reutilizáveis e a manutenção de baixo acoplamento entre os módulos da aplicação.
- **Controladores e Serviços**: Os controladores são responsáveis por lidar com as requisições HTTP e os serviços contêm a lógica de negócios da aplicação.
- **Filtros de Exceção**: Capturam exceções lançadas durante o processamento das requisições HTTP, permitindo tratamento customizado das mesmas.

###### MongoDB
MongoDB é um banco de dados NoSQL, orientado a documentos, que oferece flexibilidade, escalabilidade e desempenho para aplicações modernas. Ele armazena dados em formato JSON-like (BSON) e é altamente adequado para aplicativos que exigem uma estrutura de dados dinâmica.

- Estrutura de Dados Flexível: Os documentos no MongoDB podem ter estruturas diferentes, permitindo uma maior flexibilidade no design do esquema de dados.
- Escalabilidade Horizontal: O MongoDB é altamente escalável, permitindo distribuir dados em vários servidores para suportar cargas de trabalho intensivas.

Também utilizei o mongoose que é uma biblioteca de modelagem de objetos MongoDB para Node.js, que fornece uma solução simples e baseada em esquemas para modelar os dados da aplicação. Ele traduz os dados do MongoDB para objetos JavaScript e fornece uma API para realizar operações CRUD de forma intuitiva.

#### Arquitetura
A arquitetura padrão do NestJS segue o padrão de arquitetura MVC (Model-View-Controller), mas com uma abordagem mais modular e orientada a componentes
- **Controladores**: responsáveis por lidar com as requisições HTTP, definindo os pontos de entrada da API. Eles são classes decoradas com @Controller() e contêm métodos decorados com @Get(), @Post(), @Put(), @Delete(), etc., para lidar com diferentes tipos de requisições.
- **Serviços**: contêm a lógica de negócios da aplicação. Eles são injetáveis em controladores e outros serviços, permitindo a reutilização de código e a manutenção de baixo acoplamento. Os serviços são definidos como classes decoradas com @Injectable().

## Rotas

##### [POST] /upload
Executa leitura de um arquivo .csv e salva dados de clientes no banco de dados.
##### [POST] /customer
Cria um cliente.
##### [GET] /customer
Busca todos os clientes.
##### [PATCH] /customer
Edita um cliente.
##### [DELETE] /customer
Exclui um cliente.
##### [GET] /history
Busca o histórico de todas as alterações feitas.

## Instalação

```bash
$ yarn install
```

## Iniciando aplicação

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
