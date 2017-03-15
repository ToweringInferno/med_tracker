var controllers = require('./controllers/controllers.js');


module.exports = function (app, express) {

  app.get('/users', controllers.users.get);
  // app.post('./signup', userController.signup);
  // app.post('login', userController.login);

  app.get('/schedules', controllers.schedules.get);

  app.post('/schedules', controllers.schedules.post);

  app.delete('/schedules', controllers.schedules.delete);

  app.put('/schedules', controllers.schedules.put);

  // app.get('/api', controllers.api.get);


  // app.post('/signup', userController.signup);
  // app.post('/login', userController.login);

};
