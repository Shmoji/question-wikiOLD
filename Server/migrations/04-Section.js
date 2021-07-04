// This creates the Sections table into the database

exports.up = function(knex, Promise) {
	return knex.schema.createTable('Sections', (table) => {
    table.increments('id');
    table.string('title', 70).notNullable();
    table.integer('sort_order').notNullable();
    table.integer('question_id').notNullable();
    table.foreign('question_id').references('Questions.id').onDelete('CASCADE');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('Sections');  // Get rid of Questions table
};