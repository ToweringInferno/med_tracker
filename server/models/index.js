var knex = require('../db/index');
// require bcrypt module for encryption
var bcrypt = require('bcryptjs');


module.exports = {
  users: {
    get: function () {
      console.log('models-users-get')
      return knex.select().from('users')
        .then(function (response) {
          console.log('USERS RES');
          return response;
        });
    },
    getOne: function (user) {
      console.log('gettingOne');
      return knex('users').where('username', user.username)
      .then(function(userMatch) {
        console.log('USERMATCH', userMatch);
        return userMatch;
      })
    },

    createUser: function (params, callback) {
      console.log('post-models-users', params);
      knex.insert({username: params[0], password: params[1]}).into('users')
        .catch(function(err) {
          callback(err);
        })
        .then(function(id) {
          callback(null, id);
        })
    },

    comparePassword: function(attemptedPassword) {
      return bcrypt.compare(attemptedPassword, knex('users').where({username: username}).select('password'), function (err, isMatch) {

      });
    }

    // hashPassword: function(password, function(err, hash) {

    // })

  },

  schedules: {
    get: function () {
      return knex('schedules')
        .join('meds', 'schedules.meds_id', '=', 'meds.id')
        .select('schedules.id', 'meds.medname', 'schedules.time')
        .then(function (response) {
          console.log('GET RESPONSE', response);
          return response;
        })

    },

    post: function (params, callback) {
      knex.insert({medname: params[0]}).into('meds')
        .then(function(id) {
          knex.insert({time: params[1], meds_id: id}).into('schedules')
          .catch(function(err) {
            callback(err);
          })
          .then(function(id) {
            callback(null, id);
          })
        })
    },

    delete: function(params, callback) {
      knex('schedules').where('time', params[0]).del()
        .catch(function(err) {
            callback(err);
        })
        .then(function(count) {
          console.log('DELETED ', count);
          callback(null, count);
        })
    },

    put: function(params, callback) {
      knex('schedules').where('time', params[0])
        .update({time: params[1]})
          .catch(function(err) {
              callback(err);
          })
          .then(function(count) {
            console.log('UPDATED', count);
            callback(null, count);
          })
    }
  }
}

  // api: {

  //   get: function() {

  //   }
  // }

