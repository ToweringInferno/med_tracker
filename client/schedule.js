angular.module('medTracker.schedule', [])

.controller('ScheduleController', function($scope, Reminders) {
	/*----*/
	$scope.data = {};

	var initializeReminders = function() {
		Reminders.getAll()
		.then(function(reminders) {
			$scope.data.reminders = reminders;
		})
		.catch(function(error) {
			console.error(error)
		})
	};
	
	initializeReminders();

});