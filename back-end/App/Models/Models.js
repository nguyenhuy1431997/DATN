const { Model } = require("objection");

const Knex = require("knex");

const knex = Knex({
  client: "mysql",
  connection: {
    host: "localhost",
    database: "timtro",
    user: "root",
    password: "123456",
    port: 3306
  },
  pool: {
    min: 2,
    max: 10
  }
});

Model.knex(knex);

module.exports = Model;
