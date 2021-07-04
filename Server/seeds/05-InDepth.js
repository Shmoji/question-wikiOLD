

const wikis = require('../data/indepth.json'); // Import all In-Depth Wiki data

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('InDepthWiki').del()
    .then(function() {
      // Inserts seed entries
      return knex('InDepthWiki').insert(wikis);
    });
}