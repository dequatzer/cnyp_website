angular.module('cnypModule').controller('mainController', function($rootScope,loginService,$scope,$state){
	console.log("Calling mainController");
    $scope.logout = function(){
		console.log("Logging out user");
		loginService.clearCredentials();
	}
    
	var key = $state.$current;
	var target = $($('a[ui-sref^="'+key+'"]').attr('ui-sref'));
	if( target.length ) {
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
    }

});