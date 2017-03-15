var app = angular.module('medTracker', [
	'medTracker.services',
	'medTracker.auth',
	'medTracker.schedule',
  'medTracker.input',
	'ui.router'
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$httpProvider',
 function($stateProvider, $urlRouterProvider, $httpProvider) {

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
    controller: 'ScheduleController',
    authenticate: true
  })
 .state('input', {
   	url: '/input',
		templateUrl: 'views/input.html',
		controller: 'InputController',
    authenticate: true
	});

  $urlRouterProvider.otherwise('schedule');

  // $httpProvider.interceptors.push('AttachTokens');
}])

// .factory('AttachTokens', function ($window) {

//    var attach = {
//     request: function (object) {
//       var jwt = $window.localStorage.getItem('com.medTracker');
//       if (jwt) {
//         object.headers['x-access-token'] = jwt;
//       }
//       object.headers['Allow-Control-Allow-Origin'] = '*';
//       return object;
//     }
//   };
//   return attach;
// })

// .run(function ($rootScope, $location, Auth) {
//   $rootScope.$on('$routeChangeStart', function (evt, next, current) {
//     if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
//       $location.path('/login');
//     }
//   });
// });