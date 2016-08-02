angular.module('cnypModule').controller('profileController', function($rootScope,$scope, registerService, $http,$state){
	$scope.userProfile = [];
	//console.log("user id ->"+$scope.loginParams.username);
	$scope.userProfileInfo = {};
	$scope.userId = $rootScope.globals.currentUser.username;
	console.log("rootScope currentUser username ->"+ $rootScope.globals.currentUser.username);
	console.log("rootScope currentUser username ->"+ $rootScope.globals.currentUser.uid);

    registerService.fetchProfileInfo($rootScope.globals.currentUser.uid).success(function(data){
        console.log("User data obtained "+data.profileInfo[0].first_name);
        $scope.userProfileInfo = data.profileInfo[0];
    })
	//getUserProfile();

	//function getUserProfile($scope.userId){

	//}
});