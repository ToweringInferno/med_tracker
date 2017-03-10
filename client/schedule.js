angular.module('medTracker.schedule', [])

.controller('ScheduleController', function($scope, Reminders) {
	/*----*/
	$scope.data = {};

	var initializeReminders = function() {
		Reminders.getReminders()
		.then(function(reminders) {
			$scope.data.reminders = reminders;
		})
		.catch(function(error) {
			console.error(error)
		})
	}
	initializeReminders();

});