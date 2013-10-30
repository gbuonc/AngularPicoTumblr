'use strict';

/* angular-spinner version 0.2.1
 * License: MIT.
 * Copyright (C) 2013, Uri Shaked.
 */
angular.module('angularSpinner', [])
.directive('ngSpinner', ['$window', function ($window) {
	return {
		scope: true,
		link: function (scope, element, attr) {
			scope.spinner = null;				
			function stopSpinner() {
				if (scope.spinner) {
					scope.spinner.stop();
					scope.spinner = null;
				}
			}				
			scope.$watch(attr.ngSpinner, function (options) {
				stopSpinner();
				scope.spinner = new $window.Spinner(options);
				scope.spinner.spin(element[0]);
			}, true);
			
			scope.$on('$destroy', function () {
				stopSpinner();
			});
		}
	};
}]);
// page animations
app.directive('pageAnimation', function($animate) {
   return {
      restrict: 'A',
      link: function(scope, element, attrs){
         element.bind('click', function() {
            scope.pageAnimation = attrs.pageAnimation;                  
         });      
      }
   }  
});
// background
app.directive('ngBackground', function(){
   return function(scope, element, attrs){
      attrs.$observe('ngBackground', function(value) {
         element.css({
            'background-image': 'url(' + value +')',
            'background-size' : attrs.backgroundContain ? 'contain' : 'cover',
            'background-repeat': 'no-repeat',
            'background-position': 'center'
         });
      });
   };
});
// input placeholder
app.directive('placehold', function() {
   return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attr, ctrl) {   
         var value;      
         scope.$watch(attr.ngModel, function (val) {
           value = val || '';
         });
         var placehold = function () {         
            element.val(value || attr.placehold)
         };
         var unplacehold = function () {
             element.val('');
         };            
         element.bind('focus', function () {
            /* if(value == '') */ unplacehold();
         });      
         element.bind('blur', function () {
            if (element.val() == '') placehold();
         });      
         ctrl.$formatters.unshift(function (val) {
            if (!val) {
               placehold();
               value = '';
               return attr.placehold;
            }
            return val;
         });
      }
   };
});


