angular.module('cnypModule').controller('profileController', function($rootScope,$scope, loginService, $http,$state){
	$scope.userProfile = [];
	//console.log("user id ->"+$scope.loginParams.username);
	
	$scope.userId = $rootScope.globals.currentUser.username;
	console.log("rootScope currentUser username ->"+ $rootScope.globals.currentUser.username);
	console.log("rootScope currentUser username ->"+ $rootScope.globals.currentUser.uid);

	//getUserProfile();

	//function getUserProfile($scope.userId){

	//}
});