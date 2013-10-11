app.directive('gridPage', ['$window', function($window){
   return{
      restrict: 'A',
      scope:{ 
         slideIndex:'@startindex'    
      },      
      transclude: true,
      templateUrl:'views/partials/thumbnails.html',
      link: function(scope, element, attrs){ 
         var ppp = scope.$parent.tumblr.ppp;
         var t = scope.$parent.tumblr.current;
         var l = Math.ceil(t.totalPictures/ppp);
         var tempPicsArray = t.pictures;
         scope.contents = []; 
         // populate content for slides
         for(var i=0; i<l; i++){
            scope.contents[i] = tempPicsArray.slice(i*ppp, (i*ppp)+ppp);
         }
         scope.$parent.$watch('tumblr.gridIndex', function(i){
            console.log('gridIndex changed');
            scope.gridIndex = scope.$parent.tumblr.gridIndex;
            scope.contents[i] = tempPicsArray.slice(i*ppp, (i*ppp)+ppp);
         });   
      }
   }
}]);