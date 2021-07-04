// This creates the Sections table into the database

exports.up = function(knex, Promise) {
	return knex.schema.createTable('Personal', (table) => {
    table.increments('id');   // Gives each item an id
    table.integer('user_id'); // User that answered
    // If user is deleted, so is their answer (maybe not eventualy). _User inside of User migration
    table.foreign('user_id').references('_User.id').onDelete('CASCADE'); 
    table.text('body').notNullable();  // The body of their answer
    table.integer('home_order');
    table.datetime('answer_date').notNullable();
    table.integer('upvotes'); 
    table.integer('downvotes'); 
    table.integer('shares');
    table.integer('question_id'); // Question that this answer answers (FK)
    // If question is deleted, so is this answer (maybe not eventualy)
    table.foreign('question_id').references('Questions.id').onDelete('CASCADE'); 
	});
};


exports.down = function(knex, Promise) {
	return knex.schema.dropTable('Personal');  // Get rid of Questions table
};