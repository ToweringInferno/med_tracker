var controllers = require('./controllers/controllers.js');
var utilities = require('./utilities.js');


module.exports = function (app, express) {



  app.post('/signup', controllers.users.signup);
  app.post('/login', controllers.users.login);
  app.get('/logout', controllers.users.logout);


  app.get('/schedules', utilities.activeSession, controllers.schedules.get);
  // app.get('/', utilities.activeSession, controllers.schedules.get);

  app.post('/schedules', utilities.activeSession, controllers.schedules.post);

  app.post('/delete', utilities.activeSession, controllers.schedules.delete);

  app.put('/schedules', utilities.activeSession, controllers.schedules.put);

  app.get('/*', utilities.activeSession, controllers.schedules.get);

  // app.get('/api', controllers.api.get);


  // app.post('/signup', userController.signup);
  // app.post('/login', userController.login);

};
