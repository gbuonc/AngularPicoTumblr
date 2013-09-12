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
                  tumblr.current.title = $sce.trustAsHtml(data.response.blog.title);
                  tumblr.current.description = $sce.trustAsHtml(data.response.blog.description);                  
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
      current:{
         
      },
      history:{
         
      },
      favourites:{
         
      }
   }
   return tumblr;
}]);