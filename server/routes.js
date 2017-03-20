var controllers = require('./controllers/controllers.js');
var utilities = require('./utilities.js');


module.exports = function (app, express) {

  app.post('/user/signup', controllers.users.signup);
  app.post('/user/login', controllers.users.login);
  app.get('/user/logout', controllers.users.logout);
  app.get('/user/username', controllers.users.getUsername);

  app.get('/user/isLoggedIn', function(req, res) {
    if (req.session.user) {
      res.send('True');
    }
    else {
      res.send('False');
    }
  });

  app.get('/reminders', controllers.schedules.get);
  app.get('/', controllers.schedules.get);

  app.post('/reminders', controllers.schedules.createReminder);

  app.post('/delete', controllers.schedules.deleteReminder);

  app.put('/reminders', controllers.schedules.editReminder);

  app.put('/toggleTaken', controllers.schedules.toggleTaken);

  app.post('/message', function(req, res) {
    console.log('RECEIVE TEXT', req.body);
    res.sendStatus(200);
  });
};
