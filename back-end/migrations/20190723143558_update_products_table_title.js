exports.up = function(knex, Promise) {
  return knex.schema.alterTable("products", table => {
    table.string("title");
    table.decimal("price", 18, 2);
  });
};

exports.down = function(knex, Promise) {};
