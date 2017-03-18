var models = require('../models')

var reminderWorkerFactory = function(){
  return {
    run: function(){
      models.schedules.filterAll()
        .then(function(reminders) {
          console.log('REMINDERS FILTERED', reminders);
          // models.schedules.sendReminders(reminders)
        })
    }
  };
};

module.exports = reminderWorkerFactory();