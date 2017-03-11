var controllers = require('./controllers/controllers.js');


module.exports = function (app, express) {

  console.log('CALLING CONTROLLER', controllers.schedules.get);

  app.get('/users', controllers.users.get);
  // app.post('./signup', userController.signup);
  // app.post('login', userController.login);

  app.get('/', controllers.schedules.get);

  app.post('/', controllers.schedules.post);

  app.delete('/', controllers.schedules.delete);

  app.put('/', controllers.schedules.put);

  // app.get('/api', controllers.api.get);


  // app.post('/signup', userController.signup);
  // app.post('/login', userController.login);

};
