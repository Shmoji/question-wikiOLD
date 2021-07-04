// This creates the Questions table into the database

exports.up = function(knex, Promise) {
	return knex.schema.createTable('SimpleWiki', (table) => {
    table.increments('id');
    table.text('body').notNullable();
    table.integer('sort_order').notNullable();
    table.integer('question_id').notNullable();
    table.foreign('question_id').references('Questions.id').onDelete('CASCADE'); 
	});
};


exports.down = function(knex, Promise) {
	return knex.schema.dropTable('SimpleWiki');
};