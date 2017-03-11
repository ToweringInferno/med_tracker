var app = angular.module('medTracker', [
	'medTracker.services',
	'medTracker.auth',
	'medTracker.schedule',
	'ui-router'
]);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'AuthController'
  })
  .state('signup', {
      url: '/signup',
      templateUrl: 'views/signup.html',
      controller: 'AuthController'
  })
   .state('schedule', {
      url: '/schedule',
      templateUrl: 'views/schedule.html',
      controller: 'ScheduleController'
  })
   .state('input', {
   	url: 'input',
		templateUrl: 'views/input.html',
		controller: 'InputController'
	});

  $urlRouterProvider.otherwise('schedule');
}]);


	// $httpProvider.interceptors.push(/*----*/);


// .factory( /*----*/, function(/*----*/) {
	/*--Authentication stuff--*/
// })

// .run(function(/*--dependencies--*/) {
	/*--more stuff--*/
// });






