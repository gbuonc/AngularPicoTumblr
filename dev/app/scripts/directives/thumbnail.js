'use strict';

// thumbnail in grid
app.directive('thumbnail', function(){
   return{
      restrict: 'E',   
      controller: function($scope, $rootScope, $element, $attrs){
         var tumblr = $scope.$parent.$parent.tumblr;
         $scope.showDetail = function(){
            $rootScope.pageAnimation = 'scaleUp';
            location.href='#/'+tumblr.id+'/'+$attrs.index;      
            tumblr.current.detailIndex =  parseInt($attrs.index, 10);    
         }
      },
      link: function(scope, element, attrs){
         element.on('click', function(){
            var p = element.parent().parent().parent().parent(); // jqLite doesn't allow selectors in parent :-(
            // enable click only if not swiping
            if(p.hasClass('swipeview-active')){
               scope.showDetail();
            }
         });
      }      
   };
});