var knex = require('../db/index');


module.exports = {
  users: {
    get: function () {
      return knex.select().from('users')
        .then(function (response) {
          return response;
        });

    },

    // a function which produces all the schedule items for a unique user
    post: function () {} // a function which can be used to insert a new scheduled medicine into the database
  },

  schedules: {
    get: function () {
      console.log('GET IN MODEL');
      return knex.select().from('schedules')
        .then(function (response) {
          console.log('RES', response);
          return response;
        });

    },

    post: function (params, callback) {

      console.log('POST IN MODEL');

    } // a function which can be used to insert a new scheduled medicine into the database
  },
};