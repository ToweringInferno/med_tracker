var models = require('../models');

module.exports = {

  users: {
    get: function (req, res) {
      models.users.get()
      .then(function(users) {
        console.log('USERS', users);
        res.send(users);
      })
    }
  },

  schedules: {
    get: function (req, res) {
      models.schedules.get()
      .then(function(schedules) {
        res.send(schedules);
      })
    },

    post: function(req, res) {
      var params = [req.body.medname, req.body.time];
      models.schedules.post(params, function(err, results) {
        if (err) { throw err}
        res.sendStatus(201);
      })
    },

    delete: function(req, res) {
      var params = [req.body.time];
      models.schedules.delete(params, function(err, count) {
        if (err) {throw err}
          console.log('DELETED');
          res.sendStatus(200);
      })
    },

    put: function(req, res) {
      var params = [req.body.time, req.body.newTime];
      models.schedules.put(params, function(err, count){
        if (err) {throw err}
          console.log('UPDATED');
          res.sendStatus(200);
      })
    }
  }
};