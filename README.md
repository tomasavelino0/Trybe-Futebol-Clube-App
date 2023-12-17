# ⚽ Trybe Futebol Clube

O TFC é um site informativo sobre partidas e classificações de futebol!!!

![tfc](https://user-images.githubusercontent.com/99822908/197893222-e9b8bf64-e6cb-415d-b273-ff045ff426cd.png)


## 🔎 Documentação da API

#### Login

```
  POST /login 
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório**. Seu email. |
| `password` | `string` | **Obrigatório**. Sua senha. |

#### Validação de Login

```
  GET /login/validate
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `Authorization`      | `string` | **Obrigatório**. Token do login deve ser passado no header. |

#### Times

```
  GET /teams
```

```
  GET /teams/:id
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. Id do time deve ser passado pelo parâmetro da URL. |

#### Partidas

```
  GET /matches
```

```
  GET /matches?inProgress=true
```

```
  GET /matches?inProgress=false
```

```
  POST /matches
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `homeTeamId` | `number` | **Obrigatório**. Id do time da casa. |
| `awayTeamId` | `number` | **Obrigatório**. Id do time visitante. |
| `homeTeamGoals` | `number` | **Obrigatório**. Número de gols do time da casa. |
| `awayTeamGoals` | `number` | **Obrigatório**. Número de gols do time visitante. |
| `Authorization`      | `string` | **Obrigatório**. Token do login deve ser passado no header. |

```
  PATCH /matches/:id/finish
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. Id da partida deve ser passada pelo parâmetro da URL. |

```
  PATCH /matches/:id/
```
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `id` | `string` | **Obrigatório**. Id da partida deve ser passada pelo parâmetro da URL. |
| `homeTeamGoals` | `number` | **Obrigatório**. Número de gols do time da casa. |
| `awayTeamGoals` | `number` | **Obrigatório**. Número de gols do time visitante. |

#### Tabela de Classificação

```
  GET /leaderboard/home
```

```
  GET /leaderboard/away
```

```
  GET /leaderboard
```

## 👨🏻‍💻 Habilidades

- Realização da dockerização dos apps, network, volume e compose;
- Modelagem de dados com MySQL através do Sequelize;
- Criação e associação de tabelas usando models do sequelize;
- Construção de uma API REST com endpoints para consumir os models criados;
- Construção de um CRUD com TypeScript, utilizando ORM;
- Implementar testes de integração com Mocha, Chai e Sinon.

## 🛠️ Ferramentas & Metodologias Utilizadas

- [Node.js](https://nodejs.org/en/);
- [Express.js](https://expressjs.com/);
- [MySQL](https://www.mysql.com/);
- [mysql2](https://www.npmjs.com/package/mysql2);
- [Sequelize(ORM)](https://sequelize.org/);
- [JWT(Autenticação)](https://jwt.io/);
- [node.bcrypt](https://www.npmjs.com/package/bcrypt)
- [Docker](https://www.docker.com/);
- [TypeScript](https://www.typescriptlang.org/);
- [Mocha](https://mochajs.org/);
- [Chai](https://www.chaijs.com/);
- [Sinon.js](https://sinonjs.org/);

---
⌨️ desenvolvido por [Tomas Avelino](https://www.linkedin.com/in/tomas-avelino-6b1547238/) 😄


