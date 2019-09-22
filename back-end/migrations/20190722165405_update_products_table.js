exports.up = function(knex, Promise) {
  return knex.schema.alterTable("products", table => {
    table.boolean("status").defaultTo(true);
  });
};

exports.down = function(knex, Promise) {};
