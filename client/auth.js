angular.module('medTracker.auth', ['medTracker.services', 'ui.bootstrap'])

.controller('AuthController', [
  '$scope',
  '$location',
  'Auth',
  function($scope, $location, Auth) {

  // $scope.nation= "AT";

  // console.log('SCOPE NATION', $scope.nation);

  $scope.alerts = [];

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.login = function () {

    var user = {
      username: $scope.user.username,
      password: $scope.user.password
    }

    Auth.login(user)
      .then(function (res) {
        $location.path('/schedule');
      })
      .catch(function (error) {
        $scope.alerts.push({msg: error.data});
        console.error(error);
      });

      $scope.username = '';
      $scope.password = '';
  };

    $scope.signup = function () {

    var user = {
      username: $scope.user.username,
      password: $scope.user.password,
      phone: $scope.user.phone
    }

    Auth.signup(user)
      .then(function (res) {
        $location.path('/schedule');
      })
      .catch(function (error) {
        $scope.alerts.push({msg: error.data});
        console.error(error);
      });

      $scope.user.username = '';
      $scope.user.password = '';
      $scope.user.phone = '';
  };



}]);
