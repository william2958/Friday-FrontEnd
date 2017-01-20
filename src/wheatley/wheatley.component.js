(function() {
'use strict';

	angular.module('myApp')
	.component('wheatley', {
		templateUrl: 'src/wheatley/wheatley.html',
		controller: WheatleyController
	});

	WheatleyController.$inject = ['$rootScope', '$timeout'];
	function WheatleyController ($rootScope, $timeout) {
		var $ctrl = this;

		var wheatleyDefaultSize = 115;
		$ctrl.wheatleySize = wheatleyDefaultSize;
		$ctrl.wheatleyBodyStrokeSize = 50;
		$ctrl.wheatleyBodyColor = "#00aced";
		$ctrl.wheatleyHeadColor = "#c0deed"

		var wheatleySuccessSize = $ctrl.wheatleySize + $ctrl.wheatleyBodyStrokeSize/2;
		var wheatleyFailureSize = $ctrl.wheatleySize + 16;
		var wheatleyPulseSize = $ctrl.wheatleySize + 6;
		var wheatleySmallSize = $ctrl.wheatleySize - 30;

		var responseListener;

		var Wheatley = Snap("#Wheatley")
		var WheatleyBody = Wheatley.select("#Body");
		var WheatleyHead = Wheatley.select("#Head")

		$ctrl.$onInit = function() {
			responseListener = $rootScope.$on('wheatley:respond', onWheatleyRespond)
		};

		$ctrl.$onDestroy = function() {
			responseListener();
		}

		function onWheatleyRespond(event, data) {
			if (data.code === 0) {
				// Key pressed code
				WheatleyHead.animate({r:wheatleyPulseSize}, 15, function() {
					WheatleyHead.animate({r:$ctrl.wheatleySize}, 15);
				})
			} else if (data.code === 1) {
				// Loading code
				WheatleyBody.animate({'stroke': 'orange'}, 200);
			} else if (data.code === 2) {
				// Normal Success code
				WheatleyHead.animate({r:wheatleyFailureSize}, 80, function() {
					WheatleyBody.animate({'stroke': 'lime'}, 200);
					WheatleyHead.animate({r:$ctrl.wheatleySize}, 200);
					$timeout(function() {
						WheatleyBody.animate({'stroke': '#4AC7EE'}, 100);
					}, 200);
				});
			} else if (data.code === 3) {
				// Failure code
				WheatleyHead.animate({r:wheatleyFailureSize}, 80, function() {
					WheatleyBody.animate({'stroke': '#F9423A'}, 200);
					WheatleyHead.animate({r:$ctrl.wheatleySize}, 200);
					$timeout(function() {
						WheatleyBody.animate({'stroke': '#4AC7EE'}, 100);
					}, 200);
				});
			} else if (data.code === 4) {
				// Make wheatley smaller
				$ctrl.wheatleySize = wheatleySmallSize;
				WheatleyHead.animate({r:wheatleySmallSize}, 100);
				WheatleyBody.animate({r:wheatleySmallSize}, 100);
				wheatleyPulseSize = $ctrl.wheatleySize + 6;
				wheatleySuccessSize = $ctrl.wheatleySize + $ctrl.wheatleyBodyStrokeSize/2;
				wheatleyFailureSize = $ctrl.wheatleySize + 16;
				wheatleySmallSize = $ctrl.wheatleySize - 30;
			} else if (data.code === 5) {
				// Make wheatley normal sized
				$ctrl.wheatleySize = wheatleyDefaultSize;
				WheatleyHead.animate({r:$ctrl.wheatleySize}, 100);
				WheatleyBody.animate({r:$ctrl.wheatleySize}, 100);
				wheatleyPulseSize = $ctrl.wheatleySize + 6;
				wheatleySuccessSize = $ctrl.wheatleySize + $ctrl.wheatleyBodyStrokeSize/2;
				wheatleyFailureSize = $ctrl.wheatleySize + 16;
				wheatleySmallSize = $ctrl.wheatleySize - 30;
			} else if (data.code === 6) {
				// Success Login code
				WheatleyHead.animate({r:wheatleyFailureSize}, 80, function() {
					WheatleyBody.animate({'stroke': 'lime'}, 200);
					WheatleyHead.animate({r:$ctrl.wheatleySize}, 200);
					$timeout(function() {
						WheatleyBody.animate({'stroke': '#4AC7EE'}, 100);
						$rootScope.$broadcast('login:success', {code: 1});
					}, 200);
				});
			}
		}

		

	}	

})();