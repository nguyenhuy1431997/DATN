// Update with your config settings.

module.exports = {
  client: "mysql",
  connection: {
    host: "localhost",
    database: "training",
    user: "root",
    password: "123456",
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
