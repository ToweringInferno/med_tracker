angular.module('medTracker.input', ['medTracker.services', 'ui.bootstrap'])

.controller('InputController', [
	'$scope',
	'$location',
	'Reminders',
  'Auth',

 function($scope, $location, Reminders, Auth) {

  $scope.checkUser = function() {
  Auth.isLoggedIn()
    .then(function(response) {
      if (response.data === 'True') {
        // $location.path('/input');
        console.log('AUTHENTICATED');
      }
      else {
        $location.path('/signin');
      }
    })
  }

  $scope.checkUser();

  // for time picker
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.ismeridian = false;


  $scope.addReminder = function () {
    console.log($scope.reminder.time);

    var formatTime= $scope.reminder.time.toString().slice(16, 21);

  	var newReminder = {
        medname: $scope.reminder.medname,
        time: formatTime,
        taken: false
      };

      console.log('NEW REMINDER', newReminder);

      Reminders.addOne(newReminder)
        .then(function(res) {
        	console.log('ADDED ONE');
        	$location.path('/');
        })
        .catch(function(err) {
        	console.error(err);
        });

        $scope.reminder.medname = '';
        $scope.reminder.time = '';
  };

}]);