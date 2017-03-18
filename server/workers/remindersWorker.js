var models = require('../models')

var reminderWorkerFactory = function(){
  return {
    run: function() {
      models.schedules.filterAll()
        .then(function(reminders) {
          if (reminders.length !== 0) {
            console.log('REMINDERS FILTERED', reminders);
            // models.schedules.sendReminders(reminders);
          }
        })
    }
  };
};

module.exports = reminderWorkerFactory();