var controllers = require('./controllers/controllers.js');
var utilities = require('./utilities.js');


module.exports = function (app, express) {

  app.post('/user/signup', controllers.users.signup);
  app.post('/user/login', controllers.users.login);
  app.get('/user/logout', controllers.users.logout);

  app.get('/user/isLoggedIn', function(req, res) {
    if (req.session.user) {
      res.send('True');
    }
    else {
      res.send('False');
    }
  });

  app.get('/reminders', utilities.activeSession, controllers.schedules.get);
  app.get('/', utilities.activeSession, controllers.schedules.get);

  app.post('/reminders', utilities.activeSession, controllers.schedules.post);

  app.post('/delete', utilities.activeSession, controllers.schedules.delete);

  app.put('/reminders', utilities.activeSession, controllers.schedules.put);

  app.put('/toggleTaken', controllers.schedules.toggleTaken);


};
