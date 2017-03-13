angular.module('medTracker.schedule', ['medTracker.services'])

.controller('ScheduleController', [
	'$scope',
	'reminders',
	function($scope, reminders) {

	$scope.allReminders = {};

	$scope.getReminders = function() {
		reminders.getAll()
			.then(function(reminders) {
				$scope.allReminders.reminders = reminders;
			})
			.catch(function(error) {
				console.error(error)
			})
	};

	$scope.getReminders();

}]);