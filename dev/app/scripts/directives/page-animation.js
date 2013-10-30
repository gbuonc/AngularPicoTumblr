'use strict';
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