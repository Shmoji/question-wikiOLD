

const edits = require('../data/edits.json'); // Import all Edits data

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Edits').del()
    .then(function() {
      // Inserts seed entries
      return knex('Edits').insert(edits);
    });
}