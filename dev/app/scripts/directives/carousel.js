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
               var totalSwipes = 0;
               console.log(totalPages);
               var gridGallery = new SwipeView(element[0], {
                  numberOfPages: totalPages,
                  loop: false,
                  vertical: true
               });
               var el, i, page;
               // Load initial data
               for (i=0; i<3; i++) {
                  var tmpl = $compile('<div grid-page startIndex="'+i+'"></div>')(scope);
                  el = document.createElement('div');
               	page = i==0 ? totalPages-1 : i-1;
               	el = tmpl[0];
               	gridGallery.masterPages[i].appendChild(el);
               }  
               console.log(gridGallery.pageIndex);                           
               // render on flip
	            gridGallery.onFlip(function () {
	               // hide page at position -1
	              

                  // if(gridGallery.pageIndex===0){               
                  //                      angular.element(gridGallery.masterPages[0]).addClass('hidden');              
                  //                   }
	            //                   // hide page next to last one in array
	            //                   if(gridGallery.pageIndex === totalPages-1){
	            //                      // calculate last masterpage via modulus 3
	            //                      var mod = (gridGallery.pageIndex+2)%3;
	            //                      $(gridGallery.masterPages[mod]).find('.thumbnails').addClass('hidden');
	            //                   }
	            //                   // when there's only one page show page 1 and hide page 2
	            //                   if(totalPages == 1){
	            //                   $(gridGallery.masterPages[1]).find('.thumbnails').removeClass('hidden');
	            //                   $(gridGallery.masterPages[2]).find('.thumbnails').addClass('hidden');
	            //                   }
               });
            }     
         });
      }
	};
}]);

app.directive('gridPage', ['$window', function($window){
   return{
      restrict: 'A',
      transclude: true,
      replace:true,
      templateUrl:'views/partials/thumbnails.html',
      link: function(scope, element, attrs){   

      }
   }
}]);



            
            // grid.gridGallery = gridGallery;
            //             gridGallery.totalSwipes = 0;
            //             
            //             
            //             // go to current initial page (wait for headerInfo animation to end)
            //             var go = window.setTimeout(function(){         
            //               grid.gotoPage(app.current.gridPage, tumblrId); 
            //               window.clearTimeout(go);
            //             }, 400);
            //             
            //             // render on flip
            //             gridGallery.onFlip(function () {
            //                // store current page in grid
            //                app.current.gridPage = gridGallery.pageIndex;                  
            //                var el, upcoming, i,
            //                picsLoaded = (gridGallery.pageIndex*ppp)+ppp,
            //                pagePreloaded = (tumblr.sites[tumblrId].pictures.length % ppp === 0) ? tumblr.sites[tumblrId].pictures.length / ppp : Math.floor((tumblr.sites[tumblrId].pictures.length / ppp) + 1);
            //                currentPage = parseInt(gridGallery.pageIndex+1, 10);              
            //                // load more pics when scrolling forward
            //                if (gridGallery.direction === 'forward') { 
            //                   gridGallery.totalSwipes +=1;
            //                   tumblr.getData(tumblrId);
            //                }                       
            //                for (i = 0; i < 3; i++) {
            //                   upcoming = gridGallery.masterPages[i].dataset.upcomingPageIndex;               
            //                   if(((startPage <=2) && (gridGallery.totalSwipes<=1) 
            //                      || (upcoming != gridGallery.masterPages[i].dataset.pageIndex)) 
            //                      && (upcoming <= picsLoaded)){            
            //                      // render template      
            //                      Handlebars.registerHelper('eachThumb', function (pictures, block) {
            //                         var ret = '';
            //                         firstPic=upcoming*ppp,
            //                         lastPic=parseInt((upcoming*ppp)+ppp, 10);                                                
            //                         for (var i=firstPic; i<lastPic; i++) {
            //                            if(pictures[i]){
            //                               ret = ret + '<a href="#/' + tumblrId + '/' + i + '" style="background-image:url('+pictures[i].thumb+'); height:'+grid.thumbHeight+'px; width:'+grid.thumbWidth+'px"></a>';
            //                            }                  
            //                         }
            //                      return ret;
            //                      });
            //                      $(gridGallery.masterPages[i]).html(template(tumblr.sites[tumblrId]));  
            //                      // if first page loaded fadein thumbnail, otherwise show them immediatly
            //                      if(gridGallery.totalSwipes === 0){
            //                         $('#swipeview-masterpage-1 .thumbnails > a').each(function(i, el){
            //                         i = i++;
            //                         var delayTime = i*100;
            //                         var fade = window.setTimeout(function(){
            //                            $(el).addClass('loaded');
            //                            window.clearTimeout(fade);
            //                         }, delayTime);              
            //                         });
            //                         $('#swipeview-masterpage-2 .thumbnails > a').each(function(i, el){
            //                            $(el).addClass('loaded');                   
            //                         });                       
            //                      }else{
            //                         $('.thumbnails > a').each(function(i, el){
            //                            $(el).addClass('loaded');                   
            //                         }); 
            //                      }
            //                   }
            //                   // hide page at position -1
            //                   if(gridGallery.pageIndex===0){               
            //                      $(gridGallery.masterPages[0]).find('.thumbnails').addClass('hidden');              
            //                   }
            //                   // hide page next to last one in array
            //                   if(gridGallery.pageIndex === totalPages-1){
            //                      // calculate last masterpage via modulus 3
            //                      var mod = (gridGallery.pageIndex+2)%3;
            //                      $(gridGallery.masterPages[mod]).find('.thumbnails').addClass('hidden');
            //                   }
            //                   // when there's only one page show page 1 and hide page 2
            //                   if(totalPages == 1){
            //                   $(gridGallery.masterPages[1]).find('.thumbnails').removeClass('hidden');
            //                   $(gridGallery.masterPages[2]).find('.thumbnails').addClass('hidden');
            //                   }
            //                }
            //             });
            //             grid.gallery = gridGallery;
         

		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
	// var grid = {
	//       init: function (tumblrId, currPage) {
	//          
	//          // set first or current active page
	//          app.current.gridPage = currPage ? currPage : 0;   
	//       },      
	//       
	//       initSwipeView: function (tumblrId, totalPictures) { 
	//          var slides = tumblr.sites[tumblrId].pictures;         
	//          // destroy previews grids
	//          if(grid.gallery){
	//             grid.gallery.destroy();
	//          }     
	//          var gridGallery = new SwipeView('#gridContent', {
	//             numberOfPages: totalPages,
	//             loop: false,
	//             vertical: true
	//          });
	//          grid.gridGallery = gridGallery;
	//          gridGallery.totalSwipes = 0;
	//          
	//          
	//          // go to current initial page (wait for headerInfo animation to end)
	//          var go = window.setTimeout(function(){         
	//            grid.gotoPage(app.current.gridPage, tumblrId); 
	//            window.clearTimeout(go);
	//          }, 400);
	//          
	//          // render on flip
	//          gridGallery.onFlip(function () {
	//             // store current page in grid
	//             app.current.gridPage = gridGallery.pageIndex;                  
	//             var el, upcoming, i,
	//             picsLoaded = (gridGallery.pageIndex*ppp)+ppp,
	//             pagePreloaded = (tumblr.sites[tumblrId].pictures.length % ppp === 0) ? tumblr.sites[tumblrId].pictures.length / ppp : Math.floor((tumblr.sites[tumblrId].pictures.length / ppp) + 1);
	//             currentPage = parseInt(gridGallery.pageIndex+1, 10);              
	//             // load more pics when scrolling forward
	//             if (gridGallery.direction === 'forward') { 
	//                gridGallery.totalSwipes +=1;
	//                tumblr.getData(tumblrId);
	//             }                       
	//             for (i = 0; i < 3; i++) {
	//                upcoming = gridGallery.masterPages[i].dataset.upcomingPageIndex;               
	//                if(((startPage <=2) && (gridGallery.totalSwipes<=1) 
	//                   || (upcoming != gridGallery.masterPages[i].dataset.pageIndex)) 
	//                   && (upcoming <= picsLoaded)){            
	//                   // render template      
	//                   Handlebars.registerHelper('eachThumb', function (pictures, block) {
	//                      var ret = '';
	//                      firstPic=upcoming*ppp,
	//                      lastPic=parseInt((upcoming*ppp)+ppp, 10);                                                
	//                      for (var i=firstPic; i<lastPic; i++) {
	//                         if(pictures[i]){
	//                            ret = ret + '<a href="#/' + tumblrId + '/' + i + '" style="background-image:url('+pictures[i].thumb+'); height:'+grid.thumbHeight+'px; width:'+grid.thumbWidth+'px"></a>';
	//                         }                  
	//                      }
	//                   return ret;
	//                   });
	//                   $(gridGallery.masterPages[i]).html(template(tumblr.sites[tumblrId]));  
	//                   // if first page loaded fadein thumbnail, otherwise show them immediatly
	//                   if(gridGallery.totalSwipes === 0){
	//                      $('#swipeview-masterpage-1 .thumbnails > a').each(function(i, el){
	//                      i = i++;
	//                      var delayTime = i*100;
	//                      var fade = window.setTimeout(function(){
	//                         $(el).addClass('loaded');
	//                         window.clearTimeout(fade);
	//                      }, delayTime);              
	//                      });
	//                      $('#swipeview-masterpage-2 .thumbnails > a').each(function(i, el){
	//                         $(el).addClass('loaded');                   
	//                      });                       
	//                   }else{
	//                      $('.thumbnails > a').each(function(i, el){
	//                         $(el).addClass('loaded');                   
	//                      }); 
	//                   }
	//                }
	//                // hide page at position -1
	//                if(gridGallery.pageIndex===0){               
	//                   $(gridGallery.masterPages[0]).find('.thumbnails').addClass('hidden');              
	//                }
	//                // hide page next to last one in array
	//                if(gridGallery.pageIndex === totalPages-1){
	//                   // calculate last masterpage via modulus 3
	//                   var mod = (gridGallery.pageIndex+2)%3;
	//                   $(gridGallery.masterPages[mod]).find('.thumbnails').addClass('hidden');
	//                }
	//                // when there's only one page show page 1 and hide page 2
	//                if(totalPages == 1){
	//                $(gridGallery.masterPages[1]).find('.thumbnails').removeClass('hidden');
	//                $(gridGallery.masterPages[2]).find('.thumbnails').addClass('hidden');
	//                }
	//             }
	//          });
	//          grid.gallery = gridGallery;
	//       },
	//       gotoPage: function(page, tumblrId){           
	//          setTimeout(function(){
	//             grid.gridGallery.goToPage(page);
	//          },0);
	//       }
	//    }
	//          
		   
		   
		   
		   
		   
		   
		   
		   
		   
		   
		

