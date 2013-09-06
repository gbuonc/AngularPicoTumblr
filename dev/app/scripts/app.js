'use strict';
var app= angular.module('picoTumblr', ['ngRoute', 'ngAnimate','angularSpinner']);

app.config(function ($routeProvider) {
   $routeProvider
   .when('/a', {
      templateUrl:'views/a.html',
      currentView: 'viewA'
   })
   .when('/b', {
      templateUrl:'views/b.html',
      currentView: 'viewB'
   })
   .when('/c', {
      templateUrl:'views/c.html',
      currentView: 'viewC'
   })
   .otherwise({
      redirectTo:'/a'
   });
});

app.directive('pageAnimation', function($animate) {
   return {
      restrict: 'A',
      link: function(scope, element, attrs){
         element.bind('click', function() {
            scope.pageAnimation = attrs.pageAnimation;                  
         });      
      }
   }  
});

app.factory('dataService', ['$rootScope', function ($rootScope) {
   var service = {
      isHome : 'Yeah'
        // SaveState: function () {
        //             sessionStorage.userService = angular.toJson(service.model);
        //         },
        //         RestoreState: function () {
        //             service.model = angular.fromJson(sessionStorage.userService);
        //         }
   }
    // $rootScope.$on("savestate", service.SaveState);
    //     $rootScope.$on("restorestate", service.RestoreState);
    return service;
}]);

app.controller('MainCtrl', ['$scope', '$rootScope', '$route', '$routeParams', function ($scope, $rootScope, $route, $routeParams) { 
   $scope.loading = false;   
   $scope.$on(
      "$routeChangeSuccess",
      function( $currentRoute, $previousRoute ){ 
         $scope.currentView = $route.current.currentView;  
      }
   );
}]);

app.controller('HomeCtrl', ['$scope', 'dataService', function ($scope, dataService) {    
   $scope.test=dataService;   
}]);