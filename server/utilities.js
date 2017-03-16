
module.exports = {

  activeSession : function(req, res, next) {
    if (!(req.session ? !!req.session.user : false)) {
      res.redirect('/login');
    }
    else {
      next();
    }
  },

  startSession : function(req, res, newUser) {
    console.log('NEW SESSSION USER');
    return req.session.regenerate(function() {
      req.session.user = newUser;
      res.redirect('/schedule');
    });
  }

}