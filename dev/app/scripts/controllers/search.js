app.controller('SearchCtrl', ['$scope', 'myService', function ($scope, myService) { 
   var url='http://api.tumblr.com/v2/blog/scipsy.tumblr.com/info?api_key=fuiKNFp9vQFvjLNvx4sUwti4Yb5yGutBN4Xh10LXZhhRKjWlV4&callback=JSON_CALLBACK';
   $scope.getJson = function(){
      console.log($scope.tumblrSite);
      myService.async(url).then(function(d) {
         console.log(d);
         $scope.blog = d.response.blog;
      });
      //return $http.jsonp(url);
   } 
}]);