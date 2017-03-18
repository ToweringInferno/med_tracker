angular.module('medTracker.schedule', ['medTracker.services'])

.controller('ScheduleController', [
	'$scope',
	'reminders',
	function($scope, reminders) {

	$scope.allReminders = {};
	$scope.allMeds = [];

	$scope.getReminders = function() {
		reminders.getAll()
			.then(function(reminders) {
				$scope.allReminders.reminders = reminders;
				$scope.allReminders.reminders.data.forEach(function(object) {
					$scope.allMeds.push(object.medname);
				})
				console.log('MED NAMES', $scope.allMeds);
			})
			.catch(function(error) {
				console.error(error)
			})
	};

	$scope.getReminders();

	$scope.remove = function($index) {

		var deleteTarget = $scope.allReminders.reminders.data[$index].time;

		reminders.deleteOne({time: deleteTarget})
		  .then(function(response) {
		  	console.log('DELETE RESPONSE', response);
		  	$scope.getReminders();
		  })
		  .catch(function(error) {
				console.error(error)
			})
	};

	$scope.update = function($index, newtime) {

		var updateObj = {
			time: $scope.allReminders.reminders.data[$index].time,
			newTime: newtime
		};

		reminders.updateOne(updateObj)
		  .then(function(response) {
		  	console.log('UPDATE RESPONSE', response);
		  	$scope.getReminders();
		  })
		  .catch(function(error) {
				console.error(error)
			})

			$scope.newtime = '';
	};

	$scope.flag = false;

  $scope.editHandler = function() {
      console.log('BEING HANDLED');
      $scope.flag = true;
  };

  $scope.makeComparison = function(selectedDrug, otherDrug) {

  		// var firstDrug = otherDrug.toLowerCase();
  		// console.log(firstDrug);
  		// var secondDrug = selectedDrug.toLowerCase();

  		var firstCode;
  		var secondCode;

  		reminders.fetchCode(otherDrug)
	  		.catch(function(error) {
					console.error(error)
				})
  		  .then(function(res) {
  		  	firstCode = res.data.idGroup.rxnormId[0];
  		  	console.log('FIRST CODE', firstCode);

  		  	reminders.fetchCode(selectedDrug)
  		  		.catch(function(error) {
							console.error(error)
						})
		  		  .then(function(res) {
			  		  secondCode = res.data.idGroup.rxnormId[0];
			  		  console.log('SECOND', secondCode);

			  		  reminders.getInteraction(firstCode, secondCode)
						    .then(function(res) {
						    	console.log('INTERACTION RES', res.data.fullInteractionTypeGroup[0].fullInteractionType[0].interactionPair[0].description);
						    	$scope.interaction = res.data.fullInteractionTypeGroup[0].fullInteractionType[0].interactionPair[0].description;
						    })
						    .catch(function(error) {
								console.error(error)
							  });
		  		  })
  		  });
};

}]);