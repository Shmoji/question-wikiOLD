

const sections = require('../data/sections.json'); // Import all sections data

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Sections').del()
    .then(function() {
      // Inserts seed entries
      return knex('Sections').insert(sections);
    });
}