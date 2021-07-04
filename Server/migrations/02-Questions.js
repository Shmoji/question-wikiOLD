// This creates the Questions table into the database

exports.up = function(knex, Promise) {
	return knex.schema.createTable('Questions', (table) => {
    table.increments('id');   // Gives each item an id
    table.integer('user_id'); // Each question was asked by some user
    // If user is deleted, so is their question/answer/whatever. _User inside of User migration
    table.foreign('user_id').references('_User.id').onDelete('CASCADE'); 
    table.integer('view_count').defaultTo(0); // Number of views on this question
    table.string('title', 70).notNullable();  // The question itself (also called title)
    // The body of their question. There should be no body. Instead some answer or edit should be shown.
    /*table.integer('simple_id'); // Each question has a Simple Wiki
    table.foreign('simple_id').references('SimpleWiki.id').onDelete('CASCADE');  
    table.integer('indepth_id'); // Each question has an In-Depth Wiki
    table.foreign('indepth_id').references('InDepthWiki.id').onDelete('CASCADE');   
    table.integer('personal_id'); // Each question has a Personal Answers page
    table.foreign('personal_id').references('Personal.id').onDelete('CASCADE'); 
    table.integer('discussion_id'); // Each question has a Discussions page
    table.foreign('discussion_id').references('Discussion.id').onDelete('CASCADE'); 
    table.integer('edits_id'); // Each question has a Pending Edits page
    table.foreign('edits_id').references('Edits.id').onDelete('CASCADE');
    table.integer('help_id'); // Each question has a Help page
    table.foreign('help_id').references('Help.id').onDelete('CASCADE'); */
	});
};


exports.down = function(knex, Promise) {
	return knex.schema.dropTable('Questions');  // Get rid of Questions table
};