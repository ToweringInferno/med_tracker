angular.module('medTracker.services', [])

.factory('reminders', function($http) {

	var getAll = function() {
		console.log('GETTING ALL');
		return $http({
			method: 'GET',
			url: '/schedules'
		})
		.then(function(res) {
			console.log('RESPONSE'. res);
			return res;
		})
	};

	var addOne = function(reminder) {
		return $http({
			method: 'POST',
			url: '/schedules',
			data: reminder
		})
	};

	var deleteOne = function(reminder) {
		return $http({
			method: 'DELETE',
			url: '/schedules',
			data: reminder
		})
	};

	var updateOne = function(reminder) {
		return $http({
			method: 'PUT',
			url: '/schedules',
			data: reminder
		})
	};

	return {
		getAll: getAll,
		addOne: addOne,
		deleteOne: deleteOne,
		updateOne: updateOne
	}
});

// .factory('Auth', function($http, $location, $window) {
// 	//
// });


