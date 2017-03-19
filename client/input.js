angular.module('medTracker.input', ['medTracker.services', 'ui.bootstrap'])

.controller('InputController', [
	'$scope',
	'$location',
	'Reminders',

 function($scope, $location, Reminders) {

  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.ismeridian = false;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };


  $scope.addReminder = function () {

  	var newReminder = {
        medname: $scope.reminder.medname,
        time: $scope.reminder.time
      };

      console.log('NEW REMINDER', newReminder);

      Reminders.addOne(newReminder)
        .then(function(res) {
        	console.log('ADDED ONE');
        	$location.path('/');
        })
        .catch(function(err) {
        	console.error(err);
        });

        $scope.reminder.medname = '';
        $scope.reminder.time = '';
  };

}]);