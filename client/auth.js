angular.module('medTracker.auth', ['medTracker.services'])

.controller('AuthController', function($scope, Auth) {

  $scope.user = {};

  $scope.signin = function () {
    Auth.signin($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.medTracker', token);
        $location.path('/schedule');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

    $scope.signup = function () {
    Auth.signup($scope.user)
      .then(function (token) {
        $window.localStorage.setItem('com.medTracker', token);
        $location.path('/schdule');
      })
      .catch(function (error) {
        console.error(error);
      });
  };

});

// create signup function
// create login function