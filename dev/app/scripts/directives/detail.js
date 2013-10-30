'use strict';
app.directive('detailPage', ['$window','$sce', function($window, $sce){
   return{
      restrict: 'A',
      scope:{
         slideIndex:'=startindex'         
      },      
      templateUrl:'views/partials/picture.html',      
      link: function(scope, elem, attrs, $document){  
         var index = scope.slideIndex;
         scope.thumb = scope.$parent.tumblr.current.pictures[index].thumb;
         scope.pic = scope.$parent.tumblr.current.pictures[index].fullsize;
         scope.caption = $sce.trustAsHtml(scope.$parent.tumblr.current.pictures[index].caption);
      }
   }
}]);