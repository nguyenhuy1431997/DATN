// Update with your config settings.

module.exports = {
  client: "mysql",
  connection: {
    host: "localhost",
    database: "timtro",
    user: "root",
    password: "",
    port: 3306
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: "knex_migrations"
  }
};
