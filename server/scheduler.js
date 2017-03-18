var CronJob = require('cron').CronJob;
var remindersWorker = require('./workers/remindersWorker');

var schedulerFactory =  function(){
  return {
    start: function(){
      new CronJob('00 * * * * *', function() {
        console.log('Running Reminders Worker');
        remindersWorker.run();
      }, null, true, '');
    }
  };
};

module.exports = schedulerFactory();