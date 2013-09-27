'use strict';
var app= angular.module('picoTumblr', ['ngRoute', 'ngAnimate', 'ngSanitize', 'angularSpinner']);

// ROUTES °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
app.config(function ($routeProvider) {
   $routeProvider
   .when('/home', {
      templateUrl:'views/home.html',
      currentView: 'home'
   })
   .when('/:tumblrId', {
      templateUrl:'views/thumbs.html',
      currentView: 'thumbs'
   })   
   .otherwise({
      redirectTo:'/home'
   });
});

// CONTROLLERS °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
app.controller('MainCtrl', 
['$scope', '$route', '$routeParams', '$timeout', '$location', 'TumblrService', 
function ($scope, $route, $routeParams, $timeout, $location, TumblrService) { 
   // config -----------------------------------
   $scope.ppp = 20; // picsPerPage
   $scope.buffer = 80; // pics to preload
   // ------------------------------------------  
   $scope.tumblr = TumblrService;     
   $scope.$on(
      "$routeChangeSuccess",
      function( $currentRoute, $previousRoute ){ 
         $scope.currentView = $route.current.currentView;          
      } 
   );     
   // offline error 
   $scope.$watch('tumblr.isOnline', function() {
      if($scope.tumblr.isOnline && $scope.tumblr.isOnline==false){
         $scope.tumblr.isLoading = false; 
         $timeout(function(){
            alert('No internet connection detected. Please try again later.');
         }, 0); 
      }
   });
   // deal with errors retrieving Tumblr Data    
   $scope.$watch('tumblr.status', function() {
      $scope.tumblr.isLoading = false; 
      if($scope.tumblr.status && $scope.tumblr.status!=200){
         var errorMsgs = {
            empty: 'Please enter a valid tumblr ID',  
            404:'The site you entered doesn\'t exist.',
            503:'Tumblr seems down at the moment. Please try again later.', 
            noPictures: 'This tumblr doesn\'t contain pictures.',
            generic:'An error occurred. Please try again later.'
         }
         $timeout(function(){            
            alert(errorMsgs[$scope.tumblr.status]);   
            $scope.tumblr.id = null; 
            // if($scope.tumblr.history.length == 0){
            //                location.href="#/home"; 
            //             }
         }, 0);         
      }
   });
}]);

/* home */
app.controller('HomeCtrl', ['$scope', 'TumblrService', function ($scope, TumblrService) {    
   $scope.tumblr = TumblrService;   
}]);

/* thumbs */
app.controller('thumbsCtrl', ['$scope', '$route', '$routeParams', '$location', 'TumblrService', function ($scope, $route, $routeParams, $location, TumblrService) {  
   $scope.tumblr.id = $routeParams.tumblrId;
   $scope.tumblr = TumblrService;   

   //get data when entering the page if coming directly from adress bar
   if(!$scope.tumblr.current.id) $scope.tumblr.getTumblr();

   
   $scope.$watch('tumblr.current.pictures.length', function(l){
      console.log(l);
      // var totalPictures = $scope.tumblr.current.totalPictures;
      //       var ppp = $scope.ppp;
      //       var buffer = $scope.buffer;
      //             // var totalPages = (totalPictures % ppp === 0) ? totalPictures / ppp : Math.floor((totalPictures / ppp) + 1);
      //       if($scope.tumblr.current.totalPictures){
      //          // calculate how many pics to buffer
      //          var picsToLoad =(totalPictures< buffer)?totalPictures:buffer;
      //          if ($scope.tumblr.current.pictures && $scope.tumblr.current.pictures.length < picsToLoad) {
      //             console.log('load again');
      //             $scope.tumblr.offset += ppp;
      //             $scope.tumblr.getData();
      //          } else {               
      //             console.log('load done');
      //          }     
      //       }     
   });
   
   // random fade in number
   var delays = [];
   $scope.random = function(i) {
      if(!delays[i]) delays[i] = Math.random();
      return delays[i];
   };   
   
}]);

/* history */
app.controller('HistoryCtrl', ['$scope', 'TumblrService', function ($scope, TumblrService) {    
   $scope.tumblr = TumblrService;      
}]);