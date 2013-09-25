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
      getData: function() {         
         var url= 'http://api.tumblr.com/v2/blog/'+tumblr.id+'.tumblr.com/posts/photo?offset='+tumblr.offset+'&limit=20&api_key='+apiKey+'&callback=JSON_CALLBACK';  
         if(tumblr.id){
            tumblr.isLoading = true; // show spinner
            var promise = $http.jsonp(url)
            .success(function(data, status) {
               tumblr.status = data.meta.status;
               if(tumblr.status == 200){                  
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
                  
                  // add to history automagically
                  var obj = {
                     id: tumblr.current.id,
                     title: tumblr.current.title,
                     avatar: tumblr.current.avatar
                  }                
                  tumblr.history.push(obj);    
                  // get pictures
                  tumblr.current.pictures=[];
                  var picts=data.response.posts; 
      				for(var i=0; i< picts.length; i++){
         				// get the pic before last item in the alt_sizes array to get image to use as thumbnail
         				var thumbnail = picts[i].photos[0].alt_sizes.length-3;
         				// tumblr bug??? 1280 pix get 403 error. So get 500px pic (first or second object depending on original pic)
         				var full = picts[i].photos[0].alt_sizes[0]; 
         				full = full.width <= 500 ? full : picts[i].photos[0].alt_sizes[1];         				
         				tumblr.current.pictures[i]={                        
         				   thumb:picts[i].photos[0].alt_sizes[thumbnail].url,
         				   fullsize:full.url,      
         				   caption:picts[i].caption                           
      				   }               
      				}                   
                  tumblr.isLoading = false;   
                  $location.path('/'+tumblr.id);
                  return data; 
               }         
               return   
            })
            .error(function(data, status){                   
               tumblr.status='generic';      
               return;         
            });     
            return promise;
         }else{       
            tumblr.status='empty';                
            return;
         }         
      },
      current:{},     
      history:[],
      favourites:[]
   }
   return tumblr;
}]);