'use strict';

// thumbnail in grid
app.directive('thumbnail', function(){
   return{
      restrict: 'E',   
      controller: function($scope, $element, $attrs){
         var tumblr = $scope.$parent.$parent.tumblr;
         $scope.showDetail = function(){
            location.href='#/'+tumblr.id+'/'+$attrs.index;
         }
      },
      link: function(scope, element, attrs){
         element.on('click', function(){
            var p = element.parent().parent().parent().parent(); // jqLite doesn't allow selectors :-()
            // enable click only if not swiping
            if(p.hasClass('swipeview-active')){
               scope.showDetail();
            }
         });
      }      
   };
});