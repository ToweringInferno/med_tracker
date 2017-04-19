var knex = require('../db/index');
var bcrypt = require('bcrypt');
var twilio = require('twilio');
require('dotenv').config();


module.exports = {
  users: {
    getUser: function (user) {
      return knex('users').where('username', user.username)
      .then(function(userMatch) {
        return userMatch;
      })
    },

    getUsername: function (user) {
      return knex('users').where('id', user).select('username')
      .then(function(username) {
        console.log('getuser', username)
        return username;
      })
    },

    createUser: function (params, callback) {
      knex.insert({username: params[0], password: params[1], phone: params[2]}).into('users')
        .catch(function(err) {
          callback(err);
        })
        .then(function(id) {
          callback(null, id);
        })
    }

  },

  schedules: {
    get: function (sessionUser) {
      return knex('schedules')
        .join('meds', 'schedules.meds_id', '=', 'meds.id')
        .where('users_id', sessionUser)
        .then(function (response) {
          return response;
        })
    },

    filterAll: function (sessionUser) {
      return knex('schedules')
        .join('meds', 'schedules.meds_id', '=', 'meds.id')
        .join('users', 'schedules.users_id', '=','users.id')
        .select('username', 'medname', 'time', 'phone', 'taken')
        .then(function (response) {
          var now = (new Date()).toString().slice(16,21);
          var reminders = [];
          console.log('NOW', now);
          for (var i = 0; i < response.length; i++) {
            console.log('TAKEN?', response[i].taken);
            if (response[i].taken === 0) {
              console.log('REMINDER TRIGGERED');
              var format = response[i].time.slice(0,5);
              if (format === now) {
                console.log('IT IS TIME');
                reminders.push(response[i]);
              }
            }
          }
          return reminders;
        })
    },

    reset: function(callback) {
      console.log('CALLING RESET');
        knex('schedules').update('taken', false)
          .catch(function(err) {
            callback(err);
          })
          .then(function(count) {
            console.log('RESET COUNT', count);
            callback(null, count);
          })
    },

    sendReminders: function (reminders) {
      console.log('SENDING REMINDERS');

      var client = new twilio.RestClient(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

      reminders.forEach(function(reminder) {
        client.sms.messages.create({
        to: reminder.phone,
        from: process.env.TWILIO_NUMBER,
        body: 'Greetings, ' + reminder.username + '! This is a reminder to take your ' + reminder.medname + '! Respond with anything to cancel!'
      }, function(err, message){
          if (!err){
            console.log('Success! The SID for this SMS message is:');
            console.log(message.sid);
          } else {
            console.log('There is an Error', err);
          }
        })
      })
    },

    createReminder: function (params, callback) {
      knex.insert({medname: params[0]}).into('meds')
        .then(function(id) {
          knex.insert({time: params[1], meds_id: id, taken: params[2], users_id: params[3]}).into('schedules')
          .catch(function(err) {
            callback(err);
          })
          .then(function(id) {
            callback(null, id);
          })
        })
    },

    deleteReminder: function(params, callback) {
      knex('schedules').where({id: params[0]}).del()
        .then(function(count) {
          knex('meds').where({id: params[1]}).del()
            .catch(function(err) {
              callback(err);
            })
            .then(function(count) {
              console.log('DELETED ', count);
              callback(null, count);
            })
        })
    },

    editReminder: function(params, callback) {
      knex('schedules').where('id', params[0])
        .update({time: params[1]})
          .catch(function(err) {
              callback(err);
          })
          .then(function(count) {
            console.log('UPDATED', count);
            callback(null, count);
          })
    },
    toggleTaken: function(toggleTaken, callback) {
      knex('schedules').where({'id': toggleTaken.id})
      .update({taken: toggleTaken.taken})
      .catch(function(err) {
        callback(err);
      })
      .then(function(count) {
        console.log('Updated ', count);
        callback(null, count);
      })
    }
  }
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

