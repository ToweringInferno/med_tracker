
module.exports = {

  activeSession : function(req, res, next) {
    if (!req.session.user) {
      console.log('REDIRECTING');
      res.redirect('/#!/signin');
    }
    else {
      console.log('SESSION ACTIVE');
      next();
    }
  },

  startSession : function(req, res, newUser) {
    req.session.regenerate(function() {
      req.session.user = newUser;
      console.log('NEW session', req.session);
      res.redirect('/#!/schedule');
    });
  }

}