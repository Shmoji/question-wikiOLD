// This creates the Help table into the database

exports.up = function(knex, Promise) {
	return knex.schema.createTable('Help', (table) => {
    table.increments('id');   // Gives each item an id
    table.text('body').notNullable();
    table.string('type', 100).notNullable();
    table.integer('sort_order').notNullable();
    table.integer('question_id'); // Question that this HW is part of (FK)
    // If question is deleted, so is this Wiki (maybe not eventualy)
    table.foreign('question_id').references('Questions.id').onDelete('CASCADE');
	});
};


exports.down = function(knex, Promise) {
	return knex.schema.dropTable('Help');  // Get rid of Help table
};