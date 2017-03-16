angular.module('medTracker.auth', ['medTracker.services'])

.controller('AuthController', [
  '$scope',
  '$location',
  'Auth',
  function($scope, $location, Auth) {

  $scope.login = function () {

    var user = {
      username: $scope.user.username,
      password: $scope.user.password
    }

    Auth.login(user)
      .then(function (res) {
        console.log('SIGNED IN', res);
        $location.path('/');
      })
      .catch(function (error) {
        console.error(error);
      });

      $scope.username = '';
      $scope.password = '';
  };

    $scope.signup = function () {

    var user = {
      username: $scope.user.username,
      password: $scope.user.password
    }


    Auth.signup(user)
      .then(function (res) {
        console.log('CREATED NEW USER', res);
      })
      .catch(function (error) {
        console.error(error);
      });

      $scope.user.username = '';
      $scope.user.password = '';
  };

}]);
