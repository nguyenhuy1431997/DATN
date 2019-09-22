exports.up = function(knex, Promise) {
  return knex.schema.table("rooms", table => {
    table
      .integer("districtId")
      .unsigned()
      .notNull()
      .index()
      .references("id")
      .inTable("districts")
      .alter();
    table
      .integer("roomTypeId")
      .unsigned()
      .notNull()
      .index()
      .references("id")
      .inTable("roomTypes")
      .alter();
  });
};

exports.down = function(knex, Promise) {};
