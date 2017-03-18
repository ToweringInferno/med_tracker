var models = require('../models')


var resetWorkerFactory = function(){
  return {
    run: function() {
      models.schedules.getAll()
        .then(function(allReminders) {
          models.schedules.reset(allReminders)
            .catch(function(err){
              console.log(err);
            })
            .then(function(reset) {
              console.log('REMINDERS RESET', reset);
            })
        })
    }
  };
};



module.exports = resetWorkerFactory();