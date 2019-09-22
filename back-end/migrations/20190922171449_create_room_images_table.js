exports.up = function(knex, Promise) {
  return knex.schema.createTable("roomImages", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table.timestamps(true, true);
    table.string("name", 100).notNull();
    table
      .integer("roomId")
      .unsigned()
      .notNull();
    table
      .integer("imageTypeId")
      .unsigned()
      .notNull();
  });
};

exports.down = function(knex, Promise) {};
