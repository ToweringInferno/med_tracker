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
      console.log('GET IN CONTROLLER');
      models.schedules.get()
      .then(function(schedules) {
        // console.log('SCHEDULES', schedules);
        res.send(schedules);
      })
    },

    post: function(req, res) {
      console.log('REQUEST BOD', req.body);
      var params = [req.body.medname, req.body.time];
      models.schedules.post(params, function(err, results) {
        if (err) { throw err}
          console.log('SEND STATUS');
        res.sendStatus(201);
      })
    }
  }
};