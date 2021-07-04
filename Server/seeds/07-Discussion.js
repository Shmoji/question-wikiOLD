

const discussions = require('../data/discussion.json'); // Import all Simple Wiki data

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Discussion').del()
    .then(function() {
      // Inserts seed entries
      return knex('Discussion').insert(discussions);
    });
}