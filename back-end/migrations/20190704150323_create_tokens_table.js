exports.up = function(knex, Promise) {
  return knex.schema.createTable("tokens", table => {
    table.increments();
    table.integer("user_id");
    table.string("token").unique();
    table.boolean("status").defaultTo(true);
  });
};

exports.down = function(knex, Promise) {};
