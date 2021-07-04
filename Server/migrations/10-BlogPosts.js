// Creates the table of posts by admin called BlogPosts

exports.up = function(knex, Promise) {
	return knex.schema.createTable('BlogPosts', (table) => {
        table.increments('id');
        table.string('title', 100);
        table.string('body', 10000);
        table.datetime('post_date');
        table.integer('user_id'); // Each question was asked by some user
        // If user is deleted, so is their question/answer/whatever. _User inside of User migration
        table.foreign('user_id').references('_User.id').onDelete('CASCADE'); 
	});
};


exports.down = function(knex, Promise) {
	return knex.schema.dropTable('BlogPosts');
};