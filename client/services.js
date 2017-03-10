angular.module('medTracker.services', [])

.factory('Reminders', function($http) {

	var getAll = function() {
		return $http({
			method: 'GET',
			url: '/'
		})
		.then(function(res) {
			return res.data;
		})
	};

	var addOne = function(reminder) {
		return $http({
			method: 'POST',
			url: '/',
			data: reminder
		})
	};

	var deleteOne = function(reminder) {
		return $http({
			method: 'DELETE',
			url: '/',
			data: reminder
		})
	};

	var updateOne = function(reminder) {
		return $http({
			method: 'PUT',
			url: '/',
			data: reminder
		})
	};	

	return {
		getReminders: getReminders,
		addReminder: addReminder,
		deleteOne: deleteOne,
		updateOne: updateOne
	}
})

.factory('Auth', function($http, $location, $window) {
	//
});


