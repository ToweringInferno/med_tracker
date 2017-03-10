var knex = require('../db/index');


module.exports = {
  users: {
    get: function () {
      return knex.select().from('users')
        .then(function (response) {
          return response;
        });

    },

    post: function () {} // a function which can be used to insert a new scheduled medicine into the database
  },

  schedules: {
    get: function () {
      return knex.select().from('schedules')
        .then(function (response) {
          return response;
        });
    },

    post: function (params, callback) {
      knex.insert({name: params[0]}).into('meds')
        .then(function(id) {
          knex.insert({time: params[1], meds_id: id}).into('schedules')
          .catch(function(err) {
            callback(err);
          })
          .then(function(id) {
            callback(null, id);
          })
        })
    }
  }
}


