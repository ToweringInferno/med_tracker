angular.module('medTracker.services', [])

.factory('Reminders', function($http) {

	var getAll = function() {
		console.log('GETTING ALL');
		return $http({
			method: 'GET',
			url: '/reminders'
		})
	};

  var getUsername = function() {
    return $http({
      method: 'GET',
      url: '/user/username'
    })
  };

	var addOne = function(reminder) {
		console.log('POST reminder', reminder);
		return $http({
			method: 'POST',
			url: '/reminders',
			data: reminder
		})
	};

	var deleteOne = function(reminder) {
		console.log('DELETE reminder', reminder);
		return $http({
			method: 'POST',
			url: '/delete',
			data: reminder
		})
	};

	var updateOne = function(reminder) {
		return $http({
			method: 'PUT',
			url: '/reminders',
			data: reminder
		})
	};

  var toggleTaken = function(toggleTaken) {
    return $http({
      method: 'PUT',
      url: '/toggleTaken',
      data: toggleTaken
    })
  }

  var fetchCode = function(drugName) {
    return $http({
      method: 'GET',
      url: 'https://rxnav.nlm.nih.gov/REST/rxcui?name=' + drugName
    })
  };

  var getInteraction = function(first, second) {
    console.log('https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=' + first + '+' + second);
    return $http({
      method: 'GET',
      url: 'https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=' + first + '+' + second
    })
  };

	return {
		getAll: getAll,
    getUsername, getUsername,
		addOne: addOne,
		deleteOne: deleteOne,
		updateOne: updateOne,
    fetchCode: fetchCode,
    getInteraction: getInteraction,
    toggleTaken: toggleTaken
	}
})

.factory('Auth', function($http, $location, $window) {

	var login = function (user) {
    return $http({
      method: 'POST',
      url: '/user/login',
      data: user
    })
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/user/signup',
      data: user
    })
  };

  var logout = function () {
    return $http({
      method: 'GET',
      url: '/user/logout',
    })
  };

  var isLoggedIn = function() {
    return $http({
      method: 'GET',
      url: '/user/isLoggedIn'
    })
  };

 return {
    login: login,
    signup: signup,
    logout: logout,
    isLoggedIn: isLoggedIn
  };

});


