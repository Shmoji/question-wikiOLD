const users = require('../data/users.json');

exports.seed = function(knex) {
  return knex('_User').del()
    .then(function() {
      return knex('_User').insert(users);
    });
}