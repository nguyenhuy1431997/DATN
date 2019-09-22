exports.up = function(knex, Promise) {
  return knex.schema.alterTable("users", table => {
    table.string("firstname");
    table.string("lastname");
    table.string("phone");
    table.string("email");
    table.boolean("gender").defaultTo(true);
    table.boolean("isAdmin").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {};
