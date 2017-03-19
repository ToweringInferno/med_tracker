var CronJob = require('cron').CronJob;
var resetWorker = require('./workers/resetWorker');

var resetFactory =  function(){
  return {
    start: function(){
      new CronJob('00 * * * * *', function() {
        console.log('Running Reset Worker');
        resetWorker.run();
      }, null, true, '');
    }
  };
};

module.exports = resetFactory();