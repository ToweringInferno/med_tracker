angular.module('medTracker.schedule', ['medTracker.services'])

.controller('ScheduleController', [
	'$scope',
	'Reminders',
  'Auth',
	function($scope, Reminders, Auth) {

	$scope.allReminders = {};
	$scope.allMeds = [];

	$scope.getReminders = function() {
		Reminders.getAll()
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

		Reminders.deleteOne({time: deleteTarget})
		  .then(function(response) {
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

		Reminders.updateOne(updateObj)
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
  		var firstCode;
  		var secondCode;

  		Reminders.fetchCode(otherDrug)
	  		.catch(function(error) {
					console.error(error)
				})
  		  .then(function(res) {
  		  	firstCode = res.data.idGroup.rxnormId[0];
  		  	Reminders.fetchCode(selectedDrug)
  		  		.catch(function(error) {
							console.error(error)
						})
		  		  .then(function(res) {
			  		  secondCode = res.data.idGroup.rxnormId[0];
			  		  Reminders.getInteraction(firstCode, secondCode)
						    .then(function(res) {
						    	console.log('INTERACTION RES', res.data.fullInteractionTypeGroup[0].fullInteractionType[0].interactionPair[0].description);
						    	$scope.interaction = res.data.fullInteractionTypeGroup[0].fullInteractionType[0].interactionPair[0].description;
						    })
						    .catch(function(error) {
								  console.error(error)
							  });
		  		  })
  		  });

  $scope.logout = function() {
    console.log('LOGOUT CLICKED');
    Auth.logout()
      .then(function(res) {
        console.log("LOGOUT SUCCESS", res);
      })
      .catch(function(error) {
        console.error(error)
      });
  }
};

}]);