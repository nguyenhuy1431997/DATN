exports.up = function(knex, Promise) {
  return knex.schema.createTable("rooms", table => {
    table
      .increments("id")
      .unsigned()
      .primary();
    table.timestamps(true, true);
    table.boolean("status").defaultTo(true);
    table.string("name", 100).notNull();
    table.string("address").notNull();
    table
      .integer("districtId")
      .unsigned()
      .notNull();
    table
      .integer("roomTypeId")
      .unsigned()
      .notNull();
    table
      .integer("userId")
      .unsigned()
      .notNull()
      .index()
      .references("id")
      .inTable("users");
    table.enum("priority", ["male", "female", "none"]).notNull();
    table.text("description").nullable();
    table.decimal("area", 4, 2).notNull();
    table.decimal("price", 18, 2).notNull();
  });
};

exports.down = function(knex, Promise) {};
