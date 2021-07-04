const knexCleaner = require('knex-cleaner');
const knexfile = require('./knexfile');
const knex = require('knex')(knexfile.test);
process.env.NODE_ENV="test"

module.exports = async () => {
    await knexCleaner.clean(knex, {
        mode: 'truncate',
        restartIdentity: true,
        ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
    });
}