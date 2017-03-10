var db = require('../db');

module.exports = {
  schedules: {
    get: function (cb) {
      console.log('ALL USERS', db.knex.select().from('users'));

    },

    // a function which produces all the schedule items for a unique user
    post: function () {} // a function which can be used to insert a new scheduled medicine into the database
  }