exports.up = function(knex, Promise) {
  return knex.schema.createTable("imageTypes", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table.string("name", 100).notNull();
  });
};

exports.down = function(knex, Promise) {};
