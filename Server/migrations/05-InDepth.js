// This creates the InDepthWiki table into the database

exports.up = function(knex, Promise) {
	return knex.schema.createTable('InDepthWiki', (table) => {
    table.increments('id');
    table.text('body').notNullable();
    table.integer('sort_order').notNullable();
    table.integer('section_id').notNullable();
    table.foreign('section_id').references('Sections.id').onDelete('CASCADE');
	});
};


exports.down = function(knex, Promise) {
	return knex.schema.dropTable('InDepthWiki');  // Get rid of Questions table
};