// swiss army node
// web utility knife

var app = angular.module('swissArmyNode', ['ngRoute']);

app.config(function($routeProvider, $locationProvider){
  $routeProvider
      .when('/', {
        templateUrl: '/public/header.html',
        controller: 'indexCtrl'                                                                                                
      });
  
  $locationProvider.html5Mode(true);
});