exports.up = function(knex, Promise) {
  return knex.schema.createTable("tokens", table => {
    table.increments();
    table.integer("user_id");
    table.string("token").unique();
    table.string("status");
  });
};

exports.down = function(knex, Promise) {};
