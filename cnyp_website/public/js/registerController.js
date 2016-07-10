angular.module('cnypModule').controller('registerController', function($scope, loginService, $http,$state,$rootScope){
	
	console.log('registerController called'+$scope);
	
	$scope.loginParams = {};

	$scope.registerUser = function(){

		if($scope.registerForm.$valid){
			console.log('Registering a user');
		}else{
			console.log('Unable to save user. Validation error');
		}
	};
	
	
});