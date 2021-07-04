

const helps = require('../data/help.json'); // Import all Help data

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Help').del()
    .then(function() {
      // Inserts seed entries
      return knex('Help').insert(helps);
    });
}