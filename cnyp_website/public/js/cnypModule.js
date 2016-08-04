'use strict'

var cnypModule = angular.module('cnypModule',['ui.router', 'ngCookies']).config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('#home', {
		url : '/',
		templateUrl : '/partials/home',
		controller : 'mainController'

	}).state('login', {
		url : '/login',
		templateUrl : '/partials/login',
		controller : 'loginController'

	}).state('profile', {
		url : '/profile',
		templateUrl : '/partials/profile',
		controller : 'profileController'

	}).state('register',{
		url : '/register',
		templateUrl : '/partials/register',
		controller : 'registerController'

	}).state('#about',{
		url : '/about',
		templateUrl : '/partials/home',
		controller : 'homeController'

	}).state('#events',{
		url : '/events',
		templateUrl : '/partials/home',
		controller : 'homeController'

	}).state('#gallery',{
		url : '/gallery',
		templateUrl : '/partials/home',
		controller : 'homeController'

	}).state('#contact',{
		url : '/contact',
		templateUrl : '/partials/home',
		controller : 'homeController'
	});

	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
	});

})
.run(['$rootScope','$state','$cookieStore','$http',
	function($rootScope,$state,$cookieStore,$http){
		//keep user logged in after page refresh
		$rootScope.globals = $cookieStore.get('globals') || {};
		if($rootScope.globals.currentUser) {
			$http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.globals.currentUser.authdata;
		}

		$rootScope.$on('$stateChangeStart', function(event,next,current){
			//redirect to login page if not logged in
			if($state.current != 'login' && !$rootScope.globals.currentUser){
				//$state.go('home');
			}
		});	
	}]);