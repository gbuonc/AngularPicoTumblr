'use strict';
app.filter('timeAgo', function() {
   return function(dateString) {
      return moment(moment.unix(dateString)._d).fromNow(); 
   };
});