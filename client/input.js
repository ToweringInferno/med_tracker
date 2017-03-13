angular.module('medTracker.input', ['medTracker.services'])

.controller('InputController', [
	'$scope',
	'$location',
	'reminders',

 function($scope, $location, reminders) {

  $scope.addReminder = function () {

  	var newReminder = {
        medname: $scope.reminder.medname,
        time: $scope.reminder.time
      };

      console.log('NEW REMINDER', newReminder);

      reminders.addOne(newReminder)
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



	// $scope.addReminder = function() {
	// 	reminders.addOne($scope.reminder)
	// 	.then(function () {
	// 		$location.path('/');
	// 	})
	// 	.catch(function(error) {
	// 		console.error(error);
	// 	});
	// };

	// build out delete function
	// $scope.deleteReminder = function(){};

	// build out update function
	// $scope.updateReminder = function(){};

}]);