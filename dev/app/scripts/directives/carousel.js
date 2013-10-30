// CAROUSEL 
app.directive('carousel', ['$window', '$compile', '$timeout', function($window, $compile, $timeout) {
	return {
	   restrict: 'A',   
		link: function (scope, element, attr) {
		   var isGrid = attr.carouselType == 'grid';         
         scope.$watch('tumblr.buffered', function(b){ 
            if(b){               
               // init once the first images have been buffered
               var totalPics = scope.tumblr.current.totalPictures;
               var totalPages = isGrid ? Math.ceil(totalPics/scope.tumblr.ppp) : totalPics;
               // add current index
               var index = isGrid ? 'gridIndex' : 'detailIndex';
               scope.tumblr.current[index] = scope.tumblr.current[index] || 0;                    
               var carousel = new SwipeView(element[0], {
                  numberOfPages: totalPages,
                  loop: false,
                  vertical: isGrid ? true : false
               });               
               carousel.totalSwipes = 0;
               $timeout(function(){
                  carousel.goToPage(scope.tumblr.current[index]); 
               }, 0)       
               var firstSlide =  angular.element(carousel.masterPages[0].firstChild);
               var secondSlide = angular.element(carousel.masterPages[1].firstChild);
               var thirdSlide =  angular.element(carousel.masterPages[2].firstChild);
               if(scope.tumblr.current[index] == 0) firstSlide.addClass('hidden'); // hide slide before first one (if we start from 0)      
               if(totalPages == 1) thirdSlide.addClass('hidden'); // hide slide after first one (if there's one page only )
               
               // render on flip
	            carousel.onFlip(function () { 	
                  // load more pics when scrolling forward (TODO CHECK)
                  if (carousel.direction === 'forward') { 
                     carousel.totalSwipes += 1;
                     scope.tumblr.getPictures();
                  }               
                  var el, i;
                  for (i=0; i<3; i++) {     
                     var upcoming = carousel.masterPages[i].dataset.upcomingPageIndex;
                     if(angular.element(carousel.masterPages[i]).html()=='' || upcoming != carousel.masterPages[i].dataset.pageIndex){      
                        if(isGrid){
                           var tmpl = $compile('<div grid-page startIndex="'+upcoming+'"></div>')(scope);
                        } else{                           
                           var tmpl = $compile('<div detail-page startIndex="'+upcoming+'"></div>')(scope);
                        }
                        el = tmpl[0];
                        angular.element(carousel.masterPages[i]).html('');
                        carousel.masterPages[i].appendChild(el);  
                     }                  
                  }  
                  // update index to scope
                  scope.$apply(function(){
                     scope.tumblr.current[index] = carousel.pageIndex;  
                     if(scope.tumblr.current.detailIndex){
                        //change grid index when coming back from detail
                        scope.tumblr.current.gridIndex = Math.floor(scope.tumblr.current.detailIndex/scope.tumblr.ppp);
                     }                   
                  });	  
	               // manage out of bounds slides
	               // last page
	               if(carousel.pageIndex === totalPages-1){
	                  angular.element(carousel.masterPages[(carousel.pageIndex+2)%3].firstChild).addClass('hidden');
	               }else{ // inner pages	                  
	                  firstSlide.removeClass('hidden');
	                  secondSlide.removeClass('hidden');
	                  thirdSlide.removeClass('hidden');
                  }
                  // first page
                  carousel.pageIndex === 0 ? firstSlide.addClass('hidden') : firstSlide.removeClass('hidden');
                  //Add/remove active class
                  var current = angular.element(carousel.masterPages[carousel.currentMasterPage]);
                  carousel.onMoveOut(function () {                     
                  	current.removeClass('swipeview-active');
                  });                  
                  carousel.onMoveIn(function () {
                  	current.addClass('swipeview-active');
                  });
               });
            }     
         });
      }
	};
}]);



