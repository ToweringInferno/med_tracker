var models = require('../models')

var reminderWorkerFactory = function(){
  return {
    run: function(){
      models.schedules.filterAll()
        .then(function(reminders) {
          console.log('REMINDER', reminder);
          models.schedules.filterReminders(reminders)
        })
    }
  };
};

module.exports = reminderWorkerFactory();