app.factory('TumblrService', ['$http', '$sce','$location',  function ($http, $sce, $location) {
   var apiKey = 'XlCJ1kpxkFjgblfrnXXm6LE1hfYcmf56jaru6PynxidzEfFJVe';
   window.addEventListener("offline", function(e) {
      tumblr.isOnline = false;
   }); 
   window.addEventListener("online", function(e) {
      tumblr.isOnline = true;   
   });     
   var tumblr = {  
      offset:0,
      isLoading : false,    
      url:function(){
         return 'http://api.tumblr.com/v2/blog/'+tumblr.id+'.tumblr.com/posts/photo?offset='+tumblr.offset+'&limit=20&api_key='+apiKey+'&callback=JSON_CALLBACK'
      },
      getTumblr: function() {         
         if(tumblr.id){ //if search is not empty
            if(!tumblr.current.id || (tumblr.current.id != tumblr.id)){ // if is a new search
               tumblr.isLoading = true; // show spinner
               tumblr.offset = 0;
               var promise = $http.jsonp(tumblr.url())
               .success(function(data, status) {
                  tumblr.status = data.meta.status;
                  if(tumblr.status == 200){                       
                     console.log("NEW SITE ---------------------------- ");                  
                     if(data.response.total_posts == 0){   // no pics. Go home.
                        tumblr.status='noPictures'; 
                        return;                                                         
                     }   
                     tumblr.current.id = tumblr.id;
                     tumblr.current.title = $sce.trustAsHtml(data.response.blog.title);
                     tumblr.current.description = $sce.trustAsHtml(data.response.blog.description);  
                     tumblr.current.avatar= 'http://api.tumblr.com/v2/blog/'+tumblr.id+'.tumblr.com/avatar/128';     
                     tumblr.current.updated = data.response.blog.updated;
                     tumblr.current.totalPictures=data.response.total_posts;                       
                     tumblr.current.pictures = [];
                     tumblr.getPictures();   
                     $location.path('/'+tumblr.id);
                     return data; 
                  }         
                  return   
               })
               .error(function(data, status){                   
                  tumblr.status='generic';      
                  return;         
               });     
               tumblr.isLoading = false;
               return promise;
            }
         }else{       
            tumblr.status='empty';                
            return;
         }         
      },
      getPictures: function(){
         tumblr.isLoading = true; // show spinner
         var promise = $http.jsonp(tumblr.url())
         .success(function(data, status) {
            tumblr.status = data.meta.status;
            if(tumblr.status == 200){     
               console.log('offset', tumblr.current.pictures.length);
               tumblr.offset = tumblr.current.pictures.length;                
               var totalPictures = tumblr.current.totalPictures;
               var ppp = 20 //$scope.ppp;
               var buffer = 80// $scope.buffer;   
               // calculate how many pics to buffer
               var picsToLoad =(totalPictures < buffer) ? totalPictures : buffer;
               console.log('picstoload:', picsToLoad, ' loaded ->', tumblr.current.pictures.length);         
               console.log('loading...');            
               var currentOffset = tumblr.current.pictures.length;
               var picts=data.response.posts; 
      			for(var i=0; i< picts.length; i++){
      				// get the pic before last item in the alt_sizes array to get image to use as thumbnail
      				var thumbnail = picts[i].photos[0].alt_sizes.length-3;
      				// tumblr bug??? 1280 pix get 403 error. So get 500px pic (first or second object depending on original pic)
      				var full = picts[i].photos[0].alt_sizes[0]; 
      				full = full.width <= 500 ? full : picts[i].photos[0].alt_sizes[1];         				
      				tumblr.current.pictures[i+currentOffset]={                        
      				   thumb:picts[i].photos[0].alt_sizes[thumbnail].url,
      				   fullsize:full.url,      
      				   caption:picts[i].caption                           
      			   }      
      			   console.log(tumblr.current.pictures[i+currentOffset].thumb);         
      			}    
         		if (tumblr.current.pictures.length < picsToLoad) {
                  tumblr.getPictures(); // loop to fill buffer
               }  
               tumblr.isLoading = false;
               
            }         
            return   
         })
         .error(function(data, status){                   
            tumblr.status='generic';      
            return;         
         });     
         
      },
      current:{}
   }
   return tumblr;
}]);
















