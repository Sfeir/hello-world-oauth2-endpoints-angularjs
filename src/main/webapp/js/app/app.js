var app = angular.module("helloapp",[]).config(function ($routeProvider){
	$routeProvider.when('/login',{
		templateUrl : 'login.html',
		controller : 'LoginController'
	});
	
	$routeProvider.when('/home',{
		templateUrl : 'home.html',
		controller : 'HomeController'
	});
	
	$routeProvider.otherwise({redirectTo: '/login'});
});

app.service('logginService', function($rootScope, $location) {
	    this.auth = function ($http){
	    	authenticate($http, $rootScope, $location);
	    };
	});

app.controller('LoginController', function ($http, $scope, $location,logginService){
	$scope.auth = logginService.auth($http);
});

app.controller('HomeController',function ($scope,$location){
	if(!$scope.signed){
		$location.path('/login');
	}
});

