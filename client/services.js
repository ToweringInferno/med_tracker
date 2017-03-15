angular.module('medTracker.services', [])

.factory('reminders', function($http) {

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

	var signin = function (user) {
    return $http({
      method: 'POST',
      url: '/users/signin',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var signup = function (user) {
    return $http({
      method: 'POST',
      url: '/users/signup',
      data: user
    })
    .then(function (resp) {
      return resp.data.token;
    });
  };

  var isAuth = function () {
    return !!$window.localStorage.getItem('com.medTracker');
  };

  var signout = function () {
    $window.localStorage.removeItem('com.medTracker');
    $location.path('/signin');
  };

 return {
    signin: signin,
    signup: signup,
    isAuth: isAuth,
    signout: signout
  };

});


