
module.exports = {

  activeSession : function(req, res, next) {
    if (!(req.session ? !!req.session.user : false)) {
      res.redirect('/#!/login');
    }
    else {
      next();
    }
  },

  startSession : function(req, res, newUser) {
    return req.session.regenerate(function() {
      req.session.user = newUser;
      console.log('NEW session', req.session);
      res.redirect('/#!/schedule');
    });
  }

}