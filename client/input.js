angular.module('medTracker.input', ['medTracker.services'])

.controller('InputController', [
	'$scope',
	'$location',
	'Reminders',

 function($scope, $location, Reminders) {

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