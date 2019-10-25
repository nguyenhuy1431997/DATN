exports.up = function(knex, Promise) {
  return knex.schema.table("rooms", table => {
    table.boolean("isAvailable").defaultTo(true);
  });
};

exports.down = function(knex, Promise) {};
