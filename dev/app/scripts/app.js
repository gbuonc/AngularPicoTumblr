'use strict';
var app= angular.module('picoTumblr', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ngTouch', 'angularSpinner']);

// ROUTES °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
app.config(function ($routeProvider) {
   $routeProvider
   .when('/home', {
      templateUrl:'views/home.html',
      currentView: 'home'
   })
   .when('/:tumblrId', {
      templateUrl:'views/grid.html',
      currentView: 'grid'
   })  
   .when('/:tumblrId/:id', {
      templateUrl:'views/detail.html',
      currentView: 'detail'
   })   
   .otherwise({
      redirectTo:'/home'
   });
});

// CONTROLLERS °°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
app.controller('MainCtrl', 
['$scope', '$rootScope', '$route', '$routeParams', '$timeout', '$location', 'TumblrService', 
function ($scope, $rootScope, $route, $routeParams, $timeout, $location, TumblrService) { 
   document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
   $rootScope.pageAnimation = 'scaleDown';
   $scope.tumblr = TumblrService;     
   $scope.$on(
      "$routeChangeSuccess",
      function( $currentRoute, $previousRoute ){ 
         $scope.currentView = $route.current.currentView;          
      } 
   );   
   $scope.setAnimation = function(anim){
      $rootScope.pageAnimation = anim;
   }  
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
            location.href="#/home";             
         }, 0);         
      }
   });
}]);

/* home */
app.controller('HomeCtrl', ['$scope', '$rootScope', 'TumblrService', function ($scope, $rootScope, TumblrService) { 
   $scope.tumblr = TumblrService;      
}]);

/* thumbs */
app.controller('gridCtrl', ['$scope', '$rootScope', '$route', '$routeParams', '$location', 'TumblrService', function ($scope, $rootScope, $route, $routeParams, $location, TumblrService) {     
   $scope.tumblr.id = $routeParams.tumblrId;
   $scope.tumblr = TumblrService;   
   //get data when entering the page if coming directly from adress bar
   if(!$scope.tumblr.current.id) $scope.tumblr.getTumblr();
   // Back Btn in header    
   $scope.goBack = function(){
      $rootScope.pageAnim = 'fromLeft';
      location.href='#/home';
   }  
   // random fade in number
   var delays = [];
   $scope.random = function(i) {
      if(!delays[i]) delays[i] = Math.random();
      return delays[i];
   };      
}]);

/* detail */
app.controller('detailCtrl', ['$scope', '$rootScope', '$route', '$routeParams', '$location', 'TumblrService', function ($scope, $rootScope, $route, $routeParams, $location, TumblrService) {  
   $scope.tumblr.id = $routeParams.tumblrId;
   $scope.tumblr.pic = $routeParams.id;
   $scope.tumblr = TumblrService; 
   // caption status 
   $scope.captionStatus = 'open'; 
   $scope.changeStatus = function(){
      $scope.captionStatus = ($scope.captionStatus == 'open') ? '' : 'open';
   }  
   // Back Btn in header    
   $scope.goBack = function(){
      $rootScope.pageAnim = 'scaleDown';
      location.href='#/'+$scope.tumblr.id;
   }  
   // check
   if(!$scope.tumblr.current.id) $scope.tumblr.getTumblr();    
}]);


/* history */
app.controller('HistoryCtrl', ['$scope', 'TumblrService', function ($scope, TumblrService) {    
   $scope.tumblr = TumblrService;      
}]);