angular.module('cnypModule').controller('mainController', function($rootScope,loginService,$scope,$state){
	
    loginService.clearCredentials();
    
	var key = $state.$current;
	var target = $($('a[ui-sref^="'+key+'"]').attr('ui-sref'));
	if( target.length ) {
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 1000);
    }

});