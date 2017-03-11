angular.module('medTracker.input', [])

.controller('InputController', function($scope, $location, Reminders) {

	$scope.reminder = {};

	$scope.addReminder = function() {
		Reminders.addOne($scope.reminder)
		.then(function () {
			$location.path('/');
		})
		.catch(function(error) {
			console.error(error);
		});
	};

	// build out delete function
	// $scope.deleteReminder = function(){};

	// build out update function
	// $scope.updateReminder = function(){};

});