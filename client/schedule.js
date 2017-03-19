angular.module('medTracker.schedule', ['medTracker.services'])

.controller('ScheduleController', [
	'$scope',
  '$location',
	'Reminders',
  'Auth',
	function($scope, $location, Reminders, Auth) {


  $scope.checkUser = function() {
  Auth.isLoggedIn()
    .then(function(response) {
      if (response.data === 'True') {
        console.log('LOCATION', $location);
        $location.path('/schedule');
      }
      else {
        console.log('LOCATION FALSE', $location);
        $location.path('/signin');
      }
    })
  }

  $scope.checkUser();

	$scope.allReminders = {};
	$scope.allMeds = [];
	$scope.completed = false;

	$scope.getReminders = function() {
		Reminders.getAll()
			.then(function(reminders) {
        console.log('Reminders', reminders);
				$scope.allReminders.reminders = reminders;
        console.log('REMINDERS', reminders);
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

  $scope.toggleTaken = function($index) {
  	// get the current status of 'taken' boolean value on specified reminder
  	var reminder = $scope.allReminders.reminders.data[$index];
  	var oldTakenStatus = reminder.taken;
  	var id = reminder.id;
  	console.log('oldTakenStatus ', oldTakenStatus);
  	// reference the opposite (i.e., toggled) value
  	var newTakenStatus = !oldTakenStatus;
  	var toggleTakenObj = {id: id, taken: newTakenStatus};

  	// make call to factory (Reminders) to toggle that value
  	Reminders.toggleTaken(toggleTakenObj) 
  	  .then(function(response) {
  		  reminder.taken = newTakenStatus;
  		  reminder.taken ? ($scope.completed = true) : ($scope.completed = false);
  	  })
  	  .catch(function(error) {
  		  console.error(error);
  	  })
  };

  // $scope.editTime = function($index, newTime){
  // 	var reminder = $scope.allReminders.reminders.data[$index];
  // 	var originalTime = reminder.time;
  // 	var id = reminder.id;
  // 	console.log('originalTime: ', originalTime);
  // };


	$scope.remove = function($index) {
		var deleteTime = $scope.allReminders.reminders.data[$index].time;
    var deleteMed = $scope.allReminders.reminders.data[$index].meds_id;

		Reminders.deleteOne({time: deleteTime, meds_id: deleteMed})
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