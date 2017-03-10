var userController = require('../userController.js');


module.exports = function (app, express) {
  app.get('/', useController.home)
  app.post('./signup', userController.signup);
  app.post('login', userController.login);
};
