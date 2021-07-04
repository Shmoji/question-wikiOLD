

const wikis = require('../data/simple.json'); // Import all Simple Wiki data

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('SimpleWiki').del()
    .then(function() {
      // Inserts seed entries
      return knex('SimpleWiki').insert(wikis);
    });
}