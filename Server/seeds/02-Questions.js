

const questions = require('../data/questions.json'); // Import all question data

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Questions').del()
    .then(function() {
      // Inserts seed entries
      return knex('Questions').insert(questions);
    });
}