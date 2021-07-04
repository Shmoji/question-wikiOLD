// Creates the table of Users called _User

exports.up = function(knex, Promise) {
	return knex.schema.createTable('_User', (table) => {
        table.increments('id');
        table.string('username', 100);
        table.string('firstname', 100);
        table.string('lastname', 100);
        table.datetime('date_joined').notNullable();
        table.string('email', 100).notNullable();
        table.string('user_title', 100);
        table.string('password', 100);
        table.boolean('is_admin').defaultTo(false);
	});
};


exports.down = function(knex, Promise) {
	return knex.schema.dropTable('_User');
};