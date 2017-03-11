angular.module('medTracker', [
	'medTracker.services',
	// 'medTracker.auth',
	'medTracker.schedule',
	'ngRoute'
])

.config(function($routeProvider, /*$httpProvider*/) {
	$routeProvider
	.when('/login', {
		templateUrl: 'views/login.html',
		controller: 'AuthController'
	})
	.when('/signup', {
		templateUrl: 'views/signup.html',
		controller: 'AuthController'
	})
	.when('/schedule', {
		templateUrl: 'views/schedule.html',
		controller: 'ScheduleController'
	})
	.when('/input', {
		templateUrl: 'views/input.html',
		controller: 'InputController'
	})
	.otherwise({
		redirectTo: '/schedule'
	})

	// $httpProvider.interceptors.push(/*----*/);
})

// .factory( /*----*/, function(/*----*/) {
	/*--Authentication stuff--*/
// })

// .run(function(/*--dependencies--*/) {
	/*--more stuff--*/
// });






