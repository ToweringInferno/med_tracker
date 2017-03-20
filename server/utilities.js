
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
  },

  endSession : function(req, res) {
    req.session.destroy(function() {
      console.log('SESSION ENDED -- REDIRECTING', req.session);
      res.redirect('/#!/signin');
    });

  }

};

  // logout: function(req, res) {
  //   console.log('SERVER-CONTROLLER-USER-LOGOUT');
  //   req.session.destroy(function() {
  //     console.log('IN-REQ.SESSION.DESTROY', req.session)
  //     res.redirect('/#!/signin');
  //   });
  // },



