angular.module('app', ['react'])
  .controller('helloController', function($scope) {
    $scope.person = { fname: 'Clark', lname: 'Kent' };
  });