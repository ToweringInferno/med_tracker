var controllers = require('./controllers/controllers.js');


module.exports = function (app, express) {

  app.get('/users', controllers.users.get);
  app.get('/signedin', controllers.checkAuth);  

  // app.get('/signup', controllers.signup.get);
  app.post('/signup', controllers.signup);

  // app.get('/login', controllers.login.get);
  app.post('/login', controllers.login);  

  app.get('/schedules', controllers.schedules.get);

  app.post('/schedules', controllers.schedules.post);

  app.post('/delete', controllers.schedules.delete);

  app.put('/schedules', controllers.schedules.put);

  // app.get('/api', controllers.api.get);


  // app.post('/signup', userController.signup);
  // app.post('/login', userController.login);

};
