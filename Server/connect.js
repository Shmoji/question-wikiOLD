// This file creates a connection to the database (using knex library) and 
// exports that connection. This is the module being imported (and used)
// by the routing files

const environment = process.env.NODE_ENV;
const config = require('./knexfile.js')[environment];
const knex = require('knex')(config)

module.exports = knex;