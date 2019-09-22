exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table.string("name", 100);
    table
      .string("username")
      .unique()
      .index();
    table.string("password");
    table.timestamps(true, true);
    table.string("firstname");
    table.string("lastname");
    table.string("phone");
    table.string("email");
    table.boolean("gender").defaultTo(true);
    table.boolean("status").defaultTo(true);
    table.boolean("isAdmin").defaultTo(false);
  });
};

exports.down = function(knex, Promise) {};
