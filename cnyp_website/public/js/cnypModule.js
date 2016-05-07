'use strict'

var cnypModule = angular.module('cnypModule',['ui.router', 'ngCookies']).config(function($stateProvider, $urlRouterProvider, $locationProvider){
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home', {
		url : '/',
		templateUrl : '/partials/home'

	}).state('login', {
		url : '/login/',
		templateUrl : '/partials/login',
		controller : 'loginController'

	}).state('profile', {
		url : '/profile/',
		templateUrl : '/partials/profile',
		controller : 'profileController'

	});

	$locationProvider.html5Mode({
  		enabled: true,
  		requireBase: false
	});

});