var knex = require('../db/index');
var Q = require('q');
var session = require('express-session');
var utilities = require('../utilities.js');
var bcrypt = require('bcrypt');
// var jwt = require('jwt-simple');
// var secret = 'secretString';
var models = require('../models');

// var findUser = Q.nbind(models.users.getOne
//   knex('users').where('username', username));
// var createUser = Q.nbind(models.users.post([username, password],
//   function (err, results) {
//     if (err) { throw err; }
//     res.sendStatus(201);
//   })
// );

module.exports = {

  users: {
    // get: function (req, res) {
    //   console.log('users-get-Controller, req session: ', req.session.user);
    //   models.users.get(req.session.user)
    //   .then(function(users) {
    //     console.log('USERS', users);
    //     res.send(users);
    //   })
    // },

  signup: function (req, res, next) {
    console.log('users-SIGNUP-Controller', req.body);
    var username = req.body.username;
    var password = req.body.password;

    return models.users.getUser({username, password})
      .then(function(userMatch) {
          if (userMatch.length === 0) {

            models.users.createUser([username, password], function(err, id) {
              if (err) {throw err}
                console.log('NEW USER', id);
                utilities.startSession(req, res, id);
            })
          }
          else {
            next(new Error('That username is already taken'));
            res.redirect('/#!/signup');
          }
          // bcrypt.hash(password, null, null, function(err, hash) {
          //   console.log('HASHED', hash);
          //   if (err) {throw err}
          // })
        })
  },

  login: function(req, res, next) {
    console.log('users-LOGIN-Controller');
    var username = req.body.username;
    var password = req.body.password;

    return models.users.getUser({username, password})
      .then(function(userMatch) {
          if (userMatch.length !== 0) {
            console.log('password compare', password, userMatch[0].password);
            if (password === userMatch[0].password) {
              var sessionID = userMatch[0].id;
              console.log('CREATE SESSION', sessionID)
              utilities.startSession(req, res, sessionID);
            }
            else {
              next(new Error('Password does not match, please try again'));
              res.redirect('/#!/login')
            }

          }
          else {
            next(new Error('User does not exist, please create account'));
            res.redirect('/#!/login')
          }
      })
  },

  logout: function(req, res) {
    req.session.destroy(function() {
      res.redirect('/#!/login');
    });
  }
},

  schedules: {
    get: function (req, res) {
      console.log('SESSION USER', req.session.user)
      models.schedules.get(req.session.user)
      .then(function(schedules) {
        res.send(schedules);
      })
    },

    post: function(req, res) {
      console.log('POSTING  TO SCHEDULES');
      console.log('INSERTING USER FOREIGN', req.session.user);
      var params = [req.body.medname, req.body.time, req.session.user];
      models.schedules.post(params, function (err, results) {
        if (err) {throw err}
          res.sendStatus(201);
      })
    },

    delete: function(req, res) {
      console.log('delete request', req.body);
      var params = [req.body.time];
      models.schedules.delete(params, function (err, count) {
        if (err) {throw err}
          console.log('DELETED');
          res.sendStatus(200);
      })
    },

    put: function(req, res) {
      console.log('UPDATE REQ BODY', req.body);
      var params = [req.body.time, req.body.newTime];
      models.schedules.put(params, function (err, count) {
        if (err) {throw err}
          console.log('UPDATED');
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


