// CAROUSEL 
app.directive('carousel', ['$window', '$compile', function($window, $compile) {
	return {
	   restrict: 'A',   
		link: function (scope, element, attr) {
		   // carouselType : grid || detail		   
         scope.$watch('tumblr.buffered', function(b){ 
            if(b){               
               // init once the first images have been buffered
               var totalPages = Math.ceil(scope.tumblr.current.totalPictures/scope.tumblr.ppp);
               var gridGallery = new SwipeView(element[0], {
                  numberOfPages: totalPages,
                  loop: false,
                  vertical: true
               });
               // add grid index to scope
               scope.tumblr.gridIndex = gridGallery.pageIndex;
               var el, i;
               // Load initial data
               for (i=0; i<3; i++) {
                  var page = i==0 ? totalPages-1 : i-1;
                  var tmpl = $compile('<div grid-page startIndex="'+page+'"></div>')(scope);
                  el = document.createElement('div');               	
               	el = tmpl[0];
               	gridGallery.masterPages[i].appendChild(el);               	
               }   
               var firstSlide =  angular.element(gridGallery.masterPages[0].firstChild);
               var secondSlide = angular.element(gridGallery.masterPages[1].firstChild);
               var thirdSlide =  angular.element(gridGallery.masterPages[2].firstChild);
               
               firstSlide.addClass('hidden'); // always hide slide before first one               
               if(totalPages == 1) thirdSlide.addClass('hidden'); // hide slide after first one (if there's one page only )
               
               // render on flip
	            gridGallery.onFlip(function () {   
	               // update grid index to scope
                  scope.$apply(function(){
                     scope.tumblr.gridIndex = gridGallery.pageIndex;
                  });	               
	               // load more pics when scrolling forward
                  if (gridGallery.direction === 'forward') { 
                     scope.tumblr.getPictures();
                  }   
                  var el, i;
                  for (i=0; i<3; i++) {                     
                     var upcoming = gridGallery.masterPages[i].dataset.upcomingPageIndex;
               		if (upcoming != gridGallery.masterPages[i].dataset.pageIndex) {
               			var tmpl = $compile('<div grid-page startIndex="'+upcoming+'"></div>')(scope);
                        el = document.createElement('div');               	
                     	el = tmpl[0];
                     	angular.element(gridGallery.masterPages[i]).html('');
                     	gridGallery.masterPages[i].appendChild(el);  
               		}               	
                  }   
	               // manage out of bounds slides
	               // last page
	               if(gridGallery.pageIndex === totalPages-1){          
	                  angular.element(gridGallery.masterPages[(gridGallery.pageIndex+2)%3].firstChild).addClass('hidden');
	               }else{ // inner pages	                  
	                  firstSlide.removeClass('hidden');
	                  secondSlide.removeClass('hidden');
	                  thirdSlide.removeClass('hidden');
                  }
                  // first page
                  gridGallery.pageIndex === 0 ? firstSlide.addClass('hidden') : firstSlide.removeClass('hidden');
               });
            }     
         });
      }
	};
}]);

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
         var index = scope.$parent.tumblr.gridIndex;
         scope.contents = []; 
         // populate content for slides
         for(var i=0; i<l; i++){
            scope.contents[i] = tempPicsArray.slice(i*ppp, (i*ppp)+ppp);
         }
         scope.$parent.$watch('tumblr.gridIndex', function(i){
            scope.contents[i] = tempPicsArray.slice(i*ppp, (i*ppp)+ppp);
         });   
      }
   }
}]);

