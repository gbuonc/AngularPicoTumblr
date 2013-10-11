// CAROUSEL 
app.directive('carousel', ['$window', '$compile', '$timeout', function($window, $compile, $timeout) {
	return {
	   restrict: 'A',   
		link: function (scope, element, attr) {
		   // carouselType : grid || detail		   
         scope.$watch('tumblr.buffered', function(b){ 
            if(b){               
               // init once the first images have been buffered
               var totalPages = Math.ceil(scope.tumblr.current.totalPictures/scope.tumblr.ppp);
               // add grid index to scope
               scope.tumblr.gridIndex = scope.tumblr.gridIndex || 0;               
               var gridGallery = new SwipeView(element[0], {
                  numberOfPages: totalPages,
                  loop: false,
                  vertical: true
               });
               gridGallery.totalSwipes = 0;
               $timeout(function(){
                  gridGallery.goToPage(scope.tumblr.gridIndex);   
               }, 0)            
                           
               var firstSlide =  angular.element(gridGallery.masterPages[0].firstChild);
               var secondSlide = angular.element(gridGallery.masterPages[1].firstChild);
               var thirdSlide =  angular.element(gridGallery.masterPages[2].firstChild);
               if(scope.tumblr.gridIndex == 0) firstSlide.addClass('hidden'); // hide slide before first one (if we start from 0)      
               if(totalPages == 1) thirdSlide.addClass('hidden'); // hide slide after first one (if there's one page only )
               
               // render on flip
	            gridGallery.onFlip(function () { 	 	               
	               // load more pics when scrolling forward
                  if (gridGallery.direction === 'forward') { 
                     gridGallery.totalSwipes += 1;
                     scope.tumblr.getPictures();
                  }               
                  var el, i;
                  for (i=0; i<3; i++) {     
                     var upcoming = gridGallery.masterPages[i].dataset.upcomingPageIndex;
                     if(angular.element(gridGallery.masterPages[i]).html()=='' || upcoming != gridGallery.masterPages[i].dataset.pageIndex){                 
                        var tmpl = $compile('<div grid-page startIndex="'+upcoming+'"></div>')(scope);
                        el = tmpl[0];
                        angular.element(gridGallery.masterPages[i]).html('');
                        gridGallery.masterPages[i].appendChild(el);  
                     }                  
                  }  
                  // update grid index to scope
                  scope.$apply(function(){
                     scope.tumblr.gridIndex = gridGallery.pageIndex;
                  });	               
	                                
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
                  
                  //Add/remove active class
                  var current = angular.element(gridGallery.masterPages[gridGallery.currentMasterPage]);
                  gridGallery.onMoveOut(function () {                     
                  	current.removeClass('swipeview-active');
                  });                  
                  gridGallery.onMoveIn(function () {
                  	current.addClass('swipeview-active');
                  });
               });
            }     
         });
      }
	};
}]);



