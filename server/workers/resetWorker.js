var models = require('../models')


var resetWorkerFactory = function(){
  return {
    run: function() {
      console.log('RESETTING');
          models.schedules.reset(function(err, count) {
            if (err) {throw err}
              console.log("RESET", count);
              return count;
          })
    }
  };
};



module.exports = resetWorkerFactory();