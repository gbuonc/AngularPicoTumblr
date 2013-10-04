angular.module('app').run(['$templateCache', function($templateCache) {

  $templateCache.put('app/views/c.html',
    "<div class=\"pt-page pt-page-c\">\r" +
    "\n" +
    "   <h1>Route C</h1>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('app/views/grid.html',
    "<div class=\"pt-page pt-page-b\" ng-controller=\"gridCtrl\">\r" +
    "\n" +
    "   <!-- header -->\r" +
    "\n" +
    "   <section class=\"thumbs-header\">\r" +
    "\n" +
    "      <h1 class=\"header-title\" ng-bind-html=\"tumblr.current.title\"></h1>         \r" +
    "\n" +
    "      <img ng-src=\"{{tumblr.current.avatar}}\" alt=\"{{tumblr.current.title}}\" class=\"header-avatar\" ng-show=\"tumblr.current.id\">\r" +
    "\n" +
    "      <div class=\"header-info\" ng-show=\"tumblr.current.id\"><strong>Last updated</strong>: {{tumblr.current.updated | timeAgo}}  &nbsp;&nbsp;&nbsp;<strong>totalPictures</strong>: {{tumblr.current.totalPictures}}</div>\r" +
    "\n" +
    "      <div ng-include=\"'views/partials/searchform.html'\"></div>   \r" +
    "\n" +
    "   </section>\r" +
    "\n" +
    "   <!-- grid -->\r" +
    "\n" +
    "   \r" +
    "\n" +
    "   <div id=\"grid-carousel\" carousel=\"\" carousel-type=\"grid\">\r" +
    "\n" +
    "   <!--\r" +
    "\n" +
    "       <span ng-repeatz=\"item in tumblr.current.pictures\" class=\"thumb\" style=\"transition-delay: {{random($index) * 300}}ms\">\r" +
    "\n" +
    "         <thumbnail ng-background=\"{{item.thumb}}\" index=\"{{$index}}\">{{$index}}</thumbnail>      \r" +
    "\n" +
    "      </span>\r" +
    "\n" +
    "    -->\r" +
    "\n" +
    "   </div>   \r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('app/views/home.html',
    "<div class=\"view home\" ng-controller=\"HomeCtrl\">\r" +
    "\n" +
    "   <h1>Picotumblr</h1>   \r" +
    "\n" +
    "   <div ng-include=\"'views/partials/searchform.html'\"></div>\r" +
    "\n" +
    "   \r" +
    "\n" +
    "   <!-- <div class=\"history-list\" ng-controller=\"HistoryCtrl\">\r" +
    "\n" +
    "      <span ng-repeat=\"historyItem in tumblr.history\" style=\"transition-delay: {{$index * 300}}ms\"><a href=\"#/{{historyItem.id}}\" class=\"thumb-wrapper\" ng-background=\"{{historyItem.avatar}}\" >{{historyItem.title}}</span></span>   \r" +
    "\n" +
    "      </div> -->\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('app/views/partials/searchform.html',
    "<form ng-submit=\"tumblr.getTumblr()\">\r" +
    "\n" +
    "   <input type=\"text\" name=\"siteId\" value=\"\" ng-model=\"tumblr.id\" placehold=\"tumblr id\">\r" +
    "\n" +
    "   <button type=\"submit\">Go</button>  \r" +
    "\n" +
    "   <button ng-click=\"tumblr.getPictures()\">+</button> \r" +
    "\n" +
    "</form>"
  );


  $templateCache.put('app/views/partials/thumbnails.html',
    "<div class=\"grid-page-container\">\r" +
    "\n" +
    "   <div ng-repeat=\"item in contents[slideIndex]\" class=\"thumb\" style=\"transition-delay: {{random($index) * 300}}ms\">\r" +
    "\n" +
    "      <thumbnail ng-background=\"{{item.thumb}}\" index=\"{{$index}}\"></thumbnail>      \r" +
    "\n" +
    "   </div>\r" +
    "\n" +
    "</div>"
  );

}]);
