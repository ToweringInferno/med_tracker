angular.module('medTracker.schedule', ['medTracker.services','ui.bootstrap'])

.controller('ScheduleController', [
	'$scope',
  '$location',
	'Reminders',
  'Auth',
	function($scope, $location, Reminders, Auth) {


    // basic authentication
  $scope.checkUser = function() {
  Auth.isLoggedIn()
    .then(function(response) {
      if (response.data === 'True') {
        // $location.path('/schedule');
        console.log("AUTHENTICATED");
      }
      else {
        $location.path('/signin');
      }
    })
  }

  $scope.checkUser();

  $scope.username;

  $scope.getUsername = function() {
    Reminders.getUsername()
      .then(function(username) {
        $scope.username = username.data[0].username;
      })
  };

  $scope.getUsername();


	$scope.allReminders = {};
	$scope.allMeds = [];


  // Load new reminders each time page loads
	$scope.getReminders = function() {
		Reminders.getAll()
			.then(function(reminders) {
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

  // For reminder nav slider
  $scope.isNavCollapsed = true;
  $scope.isCollapsed = true;

  // toggle reminders
  $scope.toggleTaken = function($index) {
  	// get the current status of 'taken' boolean value on specified reminder
  	var reminder = $scope.allReminders.reminders.data[$index];
  	var oldTakenStatus = reminder.taken;
  	var id = reminder.id;
  	console.log('oldTakenStatus', oldTakenStatus);
  	// reference the opposite (i.e., toggled) value
  	var newTakenStatus = !oldTakenStatus;
    console.log('NEW TAKEN', newTakenStatus);
  	var toggleTaken = {id: id, taken: newTakenStatus};

    var toggleStyle = angular.element( document.querySelector('#styleToggle'));

    newTakenStatus === true ? toggleStyle.addClass('alert-success').removeClass('alert-danger') : toggleStyle.addClass('alert-danger').removeClass('alert-success');

  	// make call to factory (Reminders) to toggle that value
  	Reminders.toggleTaken(toggleTaken)
  	  .then(function(response) {
  		  reminder.taken = newTakenStatus;
  		  reminder.taken ? ($scope.reminder.taken = true) : ($scope.completed = false);
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


	$scope.deleteReminder = function($index) {
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

	$scope.editReminder = function($index, newtime) {
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