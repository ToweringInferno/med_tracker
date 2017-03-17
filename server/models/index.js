var knex = require('../db/index');
var bcrypt = require('bcrypt');



module.exports = {
  users: {

    getUser: function (user) {
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
    }

    // comparePassword: function(params, callback) {
    //   console.log('COMPARING WITH', knex('users').where({username: params[1]}).select('password'))
    //   bcrypt.compare(params[0], knex('users').where({username: params[1]}).select('password'))
    //     .catch(function(err) {
    //       callback(err);
    //     })
    //     .then(function(isMatch) {
    //       console.log('MATCHING', isMatch);
    //       callback(null, isMatch);
    //     })
    // }

    // hashPassword: function(password, function(err, hash) {

    // })

  },

  schedules: {
    get: function (sessionUser) {
      return knex('schedules')
        .join('meds', 'schedules.meds_id', '=', 'meds.id')
        .where('users_id', sessionUser)
        // .select('schedules.id', 'meds.medname', 'schedules.time')
        .then(function (response) {
          console.log('GET RESPONSE', response);
          return response;
        })
    },

    //  getMed: function (med) {
    //   return knex('meds').where('medname', med.medname)
    //   .then(function(medMatch) {
    //     console.log('MEDMATCH', medMatch);
    //     return medMatch;
    //   })
    // },

    post: function (params, callback) {
      knex.insert({medname: params[0]}).into('meds')
        .then(function(id) {
          knex.insert({time: params[1], meds_id: id, users_id: params[2]}).into('schedules')
          .catch(function(err) {
            callback(err);
          })
          .then(function(id) {
            callback(null, id);
          })
        })
    },

    delete: function(params, callback) {
      knex('schedules').where({time: params[0], users_id: params[1]}).del()
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

