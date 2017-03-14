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

	$scope.remove = function($index) {

		var deleteObj = {
			time: $scope.allReminders.reminders.data[$index].time
		};

		console.log('DELETING', {time: $scope.allReminders.reminders.data[$index].time});

		reminders.deleteOne(deleteObj)
		  .then(function(response) {
		  	console.log('DELETE RESPONSE', response);
		  })
		  .catch(function(error) {
				console.error(error)
			})
	};

	$scope.update = function($index) {

		console.log('SCOPE NEW TIME', $scope.newTime)

		var updateObj = {
			time: $scope.allReminders.reminders.data[$index].time,
			newTime: $scope.newTime
		};


		console.log('UPDATING', updateObj);

		reminders.updateOne(updateObj)
		  .then(function(response) {
		  	console.log('UPDATE RESPONSE', response);
		  })
		  .catch(function(error) {
				console.error(error)
			})

			$scope.newTime = '';
	};

	$scope.flag = false;

  $scope.editHandler = function() {
      console.log('BEING HANDLED');
      $scope.flag = true;

  };

}]);