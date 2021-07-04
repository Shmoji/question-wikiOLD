// Update with your config settings.
// knexfile.js in the root of your project which will act as our
// configuration for different environments, (e.g. – local development vs production).
// This file is required to perform the knex migrations.
require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_DEV_HOST,
      database: process.env.DB_DEV_DB,
      user:     process.env.DB_DEV_USER,
      password: process.env.DB_DEV_PASS,
      port: 5555
    },
    pool: {
      propagateCreateError: false,
    },
  },

  staging: {
    client: 'pg',
    connection: {
      host: process.env.DB_STAGE_HOST,
      database: process.env.DB_STAGE_DB,
      user:     process.env.DB_STAGE_USER,
      password: process.env.DB_STAGE_PASS,
      port: 5555
    },
    pool: {
      min: 2,
      max: 10,
      propagateCreateError: false,
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_PROD_HOST,
      database: process.env.DB_PROD_DB,
      user:     process.env.DB_PROD_USER,
      password: process.env.DB_PROD_PASS,
      port: 5555
    },
    pool: {
      min: 2,
      max: 10,
      propagateCreateError: false,
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
