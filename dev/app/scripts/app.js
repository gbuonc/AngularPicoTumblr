'use strict';
var app= angular.module('picoTumblr', ['ngRoute', 'ngAnimate','angularSpinner']);

// ROUTES °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
app.config(function ($routeProvider) {
   $routeProvider
   .when('/a', {
      templateUrl:'views/home.html',
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
// DIRECTIVES °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
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
// SERVICES °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
app.factory('TumblrData', ['$http', function ($http) {
   var data = {
      title : 'FuckYeahTumblr',
      remoteUrl: 'http://api.tumblr.com/v2/blog/scipsy.tumblr.com/info?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4&callback=JSON_CALLBACK',
      isLoading : false,
      async: function() {
         data.isLoading = true; // show spinner
         var promise = $http.jsonp(data.remoteUrl)
         .then(function (r) {
            data.isLoading = false;
            return r.data.response;            
         });
         return promise;
      }
   }
   return data;
}]);

// CONTROLLERS °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
app.controller('MainCtrl', ['$scope', '$route', '$routeParams', 'TumblrData', function ($scope, $route, $routeParams, TumblrData) { 
   $scope.data = TumblrData;      
   // Call the async method and then do stuff with what is returned inside our own then function
   TumblrData.async().then(function(resp) {
      $scope.remote = resp;     
   });
   $scope.$on(
      "$routeChangeSuccess",
      function( $currentRoute, $previousRoute ){ 
         $scope.currentView = $route.current.currentView;  
      }
   );
}]);
app.controller('HomeCtrl', ['$scope', 'TumblrData', function ($scope, TumblrData) {    
   $scope.tumblr = TumblrData;
}]);