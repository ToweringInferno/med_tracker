angular.module('medTracker.services', [])

.factory('Reminders', function($http) {

	var getAll = function() {
		console.log('GETTING ALL');
		return $http({
			method: 'GET',
			url: '/schedules'
		})
		.then(function(res) {
			console.log('RESPONSE'. res);
			return res;
		})
	};

	var addOne = function(reminder) {
		console.log('POST reminder', reminder);
		return $http({
			method: 'POST',
			url: '/schedules',
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
			url: '/schedules',
			data: reminder
		})
	};

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
		addOne: addOne,
		deleteOne: deleteOne,
		updateOne: updateOne,
    fetchCode: fetchCode,
    getInteraction: getInteraction
	}
})

.factory('Auth', function($http, $location, $window) {

	var login = function (user) {
    return $http({
      method: 'POST',
      url: '/login',
      data: user
    })
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/signup',
      data: user
    })
  };

  var logout = function () {
    return $http({
      method: 'GET',
      url: '/logout',
    })
  };

 return {
    login: login,
    signup: signup,
    logout: logout
  };

});


