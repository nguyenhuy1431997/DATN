exports.up = function(knex, Promise) {
  return knex.schema.createTable("retailingRooms", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table
      .integer("renterId")
      .unsigned()
      .notNull()
      .index()
      .references("id")
      .inTable("users");
    table
      .integer("roomId")
      .unsigned()
      .notNull()
      .index()
      .references("id")
      .inTable("rooms");
    table.string("status", 10).notNull();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {};
