exports.up = function(knex, Promise) {
  return knex.schema.table("roomImages", table => {
    table
      .integer("imageTypeId")
      .unsigned()
      .notNull()
      .index()
      .references("id")
      .inTable("imageTypes")
      .alter();
  });
};

exports.down = function(knex, Promise) {};
