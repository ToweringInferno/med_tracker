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
        console.log('REMINDERS', reminders.data);
				$scope.allReminders.reminders.data.forEach(function(reminder, i) {
          console.log('REMINDER TAKEN', reminder.taken);

            $scope.allMeds.indexOf(reminder.medname) === -1 ? $scope.allMeds.push(reminder.medname) : console.log('Already exists')
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
  $scope.toggleTaken = function($index, params) {

  	// get the current status of 'taken' boolean value on specified reminder
  	console.log('oldTakenStatus', params);
    // console.log('LOGGED REMINDER', );
  	// reference the opposite (i.e., toggled) value
  	var newTakenStatus = !params[1];
    console.log('NEW TAKEN', newTakenStatus);

  	var reminderObj = {id: params[0], taken: newTakenStatus};
    console.log('REMINDER OBJ', reminderObj);

  	// make call to factory (Reminders) to toggle that value
  	Reminders.toggleTaken(reminderObj)
  	  .then(function(response) {
        console.log('TOGGLED');
  		  $scope.getReminders();
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
  };

  $scope.logout = function() {
    console.log('LOGOUT CLICKED');
    Auth.logout()
      .then(function(res) {
        console.log("LOGOUT SUCCESS", res);
        $location.path('/signin');
      })
      .catch(function(error) {
        console.error(error)
      });
    }

}]);