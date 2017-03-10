angular.module('medTracker', [
	'medTracker.services',
	'medTracker.auth',
	'medTracker.schedule',
	'ngRoute'
])

.config(function($routeProvider, $httpProvider) {
	$routeProvider
	.when() // fill in
	.when() // fill in
	.when() // fill in
	.otherwise() // fill in

	$httpProvider.interceptors.push(/*----*/);
})

.factory( /*----*/, function(/*----*/) {
	/*--Authentication stuff--*/
})

.run(function(/*--dependencies--*/) {
	/*--more stuff--*/
});






