var knex = require('../db/index');
var Q = require('q');
var session = require('express-session');
var utilities = require('../utilities.js');
var bcrypt = require('bcrypt');
var models = require('../models');

module.exports = {

  users: {

  signup: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var phone = req.body.phone;

    return models.users.getUser({username, password})
      .then(function(userMatch) {
          if (userMatch.length === 0) {
            models.users.createUser([username, password, phone], function(err, id) {
              if (err) {throw err}
                utilities.startSession(req, res, id);
            })
          }
          else {
            console.error('That username is already taken');
            res.status(403).send('Sorry, username is taken!');
          }
        })
  },

  login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    return models.users.getUser({username, password})
      .then(function(userMatch) {
          if (userMatch.length !== 0) {
            if (password === userMatch[0].password) {
              var sessionID = userMatch[0].id;
              utilities.startSession(req, res, sessionID);
            }
            else {
              // next(new Error('Password does not match, please try again'));
              console.error('Password does not match');
              res.status(403).send('Password Incorrect');
            }

          }
          else {
            console.error('User does not exist, please create account');
            res.status(404).send('Sorry, we coudn\'t find that user!');
          }
      })
  },

  logout: function(req, res) {
    req.session.destroy(function() {
      res.redirect('/#!/signin');
    });
  },

  getUsername: function (req, res) {
    console.log('SEARCHING USER ID', req.session.user);
    models.users.getUsername(req.session.user)
    .then(function(username) {
      res.send(username)
    })
  }
},

  schedules: {
    get: function (req, res) {
      models.schedules.get(req.session.user)
      .then(function(schedules) {
        res.send(schedules);
      })
    },

    post: function(req, res) {
      var params = [req.body.medname, req.body.time, req.body.taken, req.session.user];
      models.schedules.post(params, function (err, results) {
        if (err) {throw err}
          res.sendStatus(201);
      })
    },

    delete: function(req, res) {
      var params = [req.body.time, req.session.user, req.body.meds_id];
      models.schedules.delete(params, function (err, count) {
        if (err) {throw err}
          res.sendStatus(200);
      })
    },

    put: function(req, res) {
      console.log('UPDATE REQ BODY', req.body);
      var params = [req.body.time, req.body.newTime];
      models.schedules.put(params, function (err, count) {
        if (err) {throw err}
          res.sendStatus(200);
      })
    }
  }
};

  // ALTERNATIVE IMPLEMENTATION
  // signup: function(req, res, next) {
  //   var username = req.body.username;
  //   var password = req.body.password;
  //     return knex('users')
  //       .where('username', username)
  //       .then(user => {
  //         if (user) {
  //           return res.status(400).json({message: 'username is already taken'});
  //         }
  //         // if not, hash user's password (by invoking method in the model)
  //         return users.hashPassword(password)
  //       })
  //       .then(hash => {
  //         // create new user in db with username and hashed pw
  //         return models.users.post([username, hash], function (err, results) {
  //       if (err) {throw err}
  //         res.sendStatus(201);
  // }

  // api: {

  //   get: function(req, res) {
  //     models.api.get()
  //       .then(function(drugs) {
  //         res.send(drugs);
  //       })
  //   }

  // }

  // {
  //   post: function(req, res) {
  //     console.log('SENDING SIGNUP INFO');
  //     // validate user-submitted info on frontend (?)
  //     // check if username already exists (if so, send status code 400)
  //     return knex('users')
  //       .where('username', username)
  //       .then(user => {
  //         if (user) {
  //           return res.status(400).json({message: 'username is already taken'});
  //         }
  //         // if not, hash user's password (by invoking method in the model)
  //         return users.hashPassword(password)
  //       })
  //       .then(hash => {
  //         // create new user in db with username and hashed pw
  //         return models.users.post([username, hash], function (err, results) {
  //       if (err) {throw err}
  //         res.sendStatus(201);/* write out callback (?) */)
  //         // Send back a 201 response
  //         // redirect user to login view
  //       })
  //   }
  // },

//////////////////////////
// // PASSPORT STUFF:

// // import passport module for authentication
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
// // var BasicStrategy = require('passport-http').BasicStrategy;

// // use passport to set up authentication strategy
// var strategy = new BasicStrategy(function(username, password, cb) {
//   models.users.get({username: username})
//   .then(function(user) {
//     if (!user) {
//       return cb(null, false, {
//         message: 'Incorrect username'
//       });
//     }
//     if (user.password !== password) {
//       return cb(null, false, 'Incorrect password');
//     }
//     return cb(null, user);
//   })
//   .catch(function(err) {
//     return cb(err);
//   });
// });

// passport.use(strategy);

//////////////////////////

    // validateUserData: function(req, res) {
    //   // VALIDATE post request data
    //   // also: validate for data type (i.e., string)
    //   // also: validate for data length

    //   // check if data was sent by client
    //   if (!(req.body)) {
    //     return res.status(400).json({message: 'No request data received'});
    //   }
    //   // check for username info
    //   if (!('username' in req.body)) {
    //     return res.status(422).json({message: 'Missing username'});
    //   }
    //   // initialize username and password variables
    //   let {username, password} = req.body;
    //   // trim any leading or trailing white space
    //   username = username.trim();
    //   // check if password was sent by client
    //   if (!(password)) {
    //     return res.status(422).json({message: 'password is missing'});
    //   }
    //   // trim any leading or trailing white space
    //   password = password.trim();
    // }

    // checkUserData: function(req, res) {
    //   // 2. CHECK DB for matching user & password
    //   var params = [username, password];
    //   models.users.get(params, function (err, results) {
    //     if (err) {throw err}
    //       res.sendStatus(201);
    //   })
    //   .then(function(user) {
    //     if (user)

    //     res.send(users);
    //   })
    // },
    //   return  knex.select

      // var params = [req.body.username, req.body.password];
      // models.users.post(params, function (err, results) {
      //   if (err) {throw err}
      //     res.sendStatus(201);
      // })
    // }


