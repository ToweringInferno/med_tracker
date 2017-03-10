angular.module('medTracker.services', [])

.factory('Reminders', function($http) {

	var getReminders = function() {
		return $http({
			method: 'GET',
			url: '/api/reminders'
		})
		.then(function(res) {
			return res.data;
		})
	};

	var addReminder = function(reminder) {
		return $http({
			method: 'POST',
			url: 'api/reminders',
			data: reminder
		})
	};
	
	return {
		getReminders: getReminders,
		addReminder: addReminder
	}
})

.factory('Auth', function($http) {
	//
});