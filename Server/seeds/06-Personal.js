

const answers = require('../data/personal.json'); // Import all Simple Wiki data

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Personal').del()
    .then(function() {
      // Inserts seed entries
      return knex('Personal').insert(answers);
    });
}