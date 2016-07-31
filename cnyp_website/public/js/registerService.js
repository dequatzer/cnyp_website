angular.module('cnypModule').factory('registerService', function($http, $location, $rootScope) {
	console.log('register service  called');
	return {
			createProfile : function(userInfo){
				var data = {
					username : userInfo.username,
					password : userInfo.password,
                    firstName : userInfo.firstName,
                    lastName : userInfo.lastName,
                    emailID : userInfo.emailID
				}
				return $http.post('/createProfile',data);
			}
	}
});