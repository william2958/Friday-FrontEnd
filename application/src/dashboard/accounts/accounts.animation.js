(function() {
'use strict';

	// An animation javascript file attached to the dashboard module.
	// To use just include  
	// ng-slide-down="$ctrl.account.showAccount" lazy-render duration="0.2"
	// as attributes $ctrl.account.showAccount is what is evaluated
	// when decidiong when to animate

	// I don't really know what's happening in this file.

	angular.module('dashboard')
	.directive('ngSlideDown', [
	    '$timeout',
	    function ($timeout) {
	      var getTemplate, link;
	      getTemplate = function (tElement, tAttrs) {
	        if (tAttrs.lazyRender !== void 0) {
	          return '<div ng-if=\'lazyRender\' ng-transclude></div>';
	        } else {
	          return '<div ng-transclude></div>';
	        }
	      };
	      link = function (scope, element, attrs, ctrl, transclude) {
	        var closePromise, duration, elementScope, emitOnClose, getHeight, hide, lazyRender, onClose, show;
	        duration = attrs.duration || 1;

	        elementScope = element.scope();
	        emitOnClose = attrs.emitOnClose;
	        onClose = attrs.onClose;
	        lazyRender = attrs.lazyRender !== void 0;
	        if (lazyRender) {
	          scope.lazyRender = scope.expanded;
	        }
	        closePromise = null;
	        element.css({
	          overflow: 'hidden',
	          transitionProperty: 'height',
	          transitionDuration: '' + duration + 's',
	          transitionTimingFunction: 'ease-in-out'
	        });
	        getHeight = function (passedScope) {
	          var c, children, height, _i, _len;
	          height = 0;
	          children = element.children();
	          for (_i = 0, _len = children.length; _i < _len; _i++) {
	            c = children[_i];
	            // This is where you can add extra height
	            height += (c.clientHeight);
	          }
	          return '' + height + 'px';
	        };
	        show = function () {
	          if (closePromise) {
	            $timeout.cancel(closePromise);
	          }
	          if (lazyRender) {
	            scope.lazyRender = true;
	          }
	          return element.css('height', getHeight());
	        };
	        hide = function () {
	          element.css('height', '0px');
	          if (emitOnClose || onClose || lazyRender) {
	            return (closePromise = $timeout(function () {
	              if (emitOnClose) {
	                scope.$emit(emitOnClose, {});
	              }
	              if (onClose) {
	                elementScope.$eval(onClose);
	              }
	              if (lazyRender) {
	                return (scope.lazyRender = false);
	              }
	            }, duration * 1000));
	          }
	        };
	        scope.$watch('expanded', function (value, oldValue) {
	          if (value) {
	            return $timeout(show);
	          } else {
	            return $timeout(hide);
	          }
	        });
	        return scope.$watch(getHeight, function (value, oldValue) {
	          if (scope.expanded && value !== oldValue) {
	            return $timeout(show);
	          }
	        });
	      };
	      return {
	        restrict: 'A',
	        scope: { expanded: '=ngSlideDown' },
	        transclude: true,
	        link: link,
	        template: function (tElement, tAttrs) {
	          return getTemplate(tElement, tAttrs);
	        }
	      };
	    }
	  ]);

})();