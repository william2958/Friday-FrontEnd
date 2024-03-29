(function() {
'use strict';

	angular.module('common')
	.component('wheatley', {
		templateUrl: 'src/wheatley/wheatley.html',
		controller: WheatleyController
	});

	WheatleyController.$inject = ['$state', '$rootScope', '$timeout', 'AuthorizationService'];
	function WheatleyController ($state, $rootScope, $timeout, AuthorizationService) {
		// The controller to handle all the wheatley actions
		var $ctrl = this;

		var responseListener;

		// Use the Snap library to handle Wheatley animations
		var Wheatley = Snap("#Wheatley");
		var WheatleyBody = Wheatley.select("#outsidering");
		var WheatleyHead = Wheatley.select("#statusring_1_");
		var OutsideRing = Wheatley.select("#outsidering");
		var OutisdeRingWrapper = Wheatley.select("#outsideringwrapper");
		var InsideRing = Wheatley.select("#insidering_1_");
		var StatusRing = Wheatley.select("#statusring_1_");
		var ComplementaryRing = Wheatley.select("#complimentaryring");
		var CoreRing = Wheatley.select("#corering");
		var DashedRing = Wheatley.select("#dashedring");
		var EntireRing = Wheatley.select("#entirering");

		var outsideRingCounter = 0;

		// Activates every time something hovers over Wheatley
		// EntireRing.hover(function() {
		// 	if (!AuthorizationService.getToken()) {
		// 		EntireRing.animate({
		// 			transform: 's1.05, 150, 150'
		// 		}, 50);
		// 	}
		// });

		// EntireRing.mouseout(function() {
		// 	if (!AuthorizationService.getToken()) {
		// 		EntireRing.animate({
		// 			transform: 's1, 150, 150'
		// 		}, 50);
		// 	}
		// });

		Wheatley.click(function() {
			if (AuthorizationService.getToken()) {
				$state.go('dashboard.accounts');
			} else {
				$state.go('authorization.login');
			}
		});

		$ctrl.$onInit = function() {
			InsideRing.attr({
				fill: "#1DCAFF"
			});

			OutsideRing.attr({
				stroke: "#0084B4",
				fill: "#0084B4"
			});

			ComplementaryRing.attr({
				fill: "#41ACD7"
			});

			DashedRing.attr({
				stroke: "#1DCAFF"
			});

			CoreRing.attr({
				stroke: "#76cee5"
			});

			// Start listening for wheatley:respond events
			responseListener = $rootScope.$on('wheatley:respond', onWheatleyRespond);
			$ctrl.wheatleyPulse();
		};

		$ctrl.$onDestroy = function() {
			// Destroy the listener
			responseListener();
		};

		$ctrl.wheatleyPulse = function() {
			// Tell wheatley to pulse indefinetley
			// WheatleyHead.animate({r:wheatleyPulseSize}, 700, function() {
			// 	WheatleyHead.animate({r:$ctrl.wheatleySize-6}, 700, $ctrl.wheatleyPulse);
			// })
			statusRingRotate();
			outsideRingRotate();
			insideRingRotate();
		};

		function outsideRingRotate() {
			OutsideRing.transform('r0,150,150');
			OutsideRing.animate({
				transform: 'r360,150,150'
			}, 30000, outsideRingRotate);
		}

		function insideRingRotate() {
			InsideRing.transform('r0,150,150');
			InsideRing.animate({
				transform: 'r360,150,150'
			}, 23000, insideRingRotate);
		}

		function statusRingRotate() {
			StatusRing.transform('r0,150,150');
			StatusRing.animate({
				transform: 'r-360,150,150'
			}, 20000, statusRingRotate);
		}

		function resetRingColors() {

			InsideRing.animate({
				fill: "#1DCAFF"
			}, 100);

			OutsideRing.animate({
				stroke: "#0084B4",
				fill: "#0084B4"
			}, 100);

			ComplementaryRing.animate({
				fill: "#41ACD7"
			}, 100);

			DashedRing.animate({
				stroke: "#1DCAFF"
			}, 100);

			CoreRing.animate({
				stroke: "#76cee5"
			}, 100);
		}

		function onWheatleyRespond(event, data) {
			if (data.code === 0) {
				// Key pressed code
				// WheatleyHead.animate({r:wheatleyPulseSize}, 15, function() {
				// 	WheatleyHead.animate({r:$ctrl.wheatleySize}, 15);
				// })

				DashedRing.animate({
					transform: 's1.05, 150, 150'
				}, 10);

				CoreRing.animate({
					transform: 's1.05,150,150'
				}, 10, function() {
					CoreRing.animate({
						transform: 's1,150,150'
					}, 10);
					DashedRing.animate({
						transform: 's1, 150, 150'
					}, 10);
				});
			} else if (data.code === 1) {
				// Loading code
				// WheatleyBody.animate({'stroke': 'orange'}, 200);
				InsideRing.animate({
					fill: '#FFA500'
				}, 50);

				DashedRing.animate({
					stroke: 'orange'
				}, 50);

				OutsideRing.animate({
					stroke: "#FF7538",
					fill: "#FF7538"
				}, 50);

				ComplementaryRing.animate({
					fill: "#FF8C00"
				}, 50);

				CoreRing.animate({
					stroke: "#FBCEB1"
				}, 50);

			} else if (data.code === 2) {
				// Normal Success code
				DashedRing.animate({
					stroke: '#1DCAFF'
				}, 50);
				InsideRing.animate({
					fill: "#62b231"
				}, 50);
				OutsideRing.animate({
					fill: "#6eb636",
					stroke: "#6eb636"
				}, 50, function() {
					resetRingColors();
				});
			} else if (data.code === 3) {
				// Failure code
				// WheatleyHead.animate({r:wheatleyFailureSize}, 80, function() {
				// 	WheatleyBody.animate({'stroke': '#F9423A'}, 200);
				// 	WheatleyHead.animate({r:$ctrl.wheatleySize}, 200);
				// 	$timeout(function() {
				// 		WheatleyBody.animate({'stroke': '#4AC7EE'}, 100);
				// 	}, 200);
				// });
				DashedRing.animate({
					stroke: '#1DCAFF'
				}, 50);
				InsideRing.animate({
					fill: "red"
				}, 200);
				OutsideRing.animate({
					fill: "red",
					stroke: "red"
				}, 200, function() {
					resetRingColors();
				});
			} else if (data.code === 4) {
				// Make wheatley smaller
				// $ctrl.wheatleySize = wheatleySmallSize;
				// WheatleyHead.animate({r:wheatleySmallSize}, 100);
				// WheatleyBody.animate({r:wheatleySmallSize}, 100);
				// wheatleyPulseSize = $ctrl.wheatleySize + 6;
				// wheatleySuccessSize = $ctrl.wheatleySize + $ctrl.wheatleyBodyStrokeSize/2;
				// wheatleyFailureSize = $ctrl.wheatleySize + 16;
				// wheatleySmallSize = $ctrl.wheatleySize - 30;
				EntireRing.animate({
					transform: 's0.8,150,150'
				}, 100);
			} else if (data.code === 5) {
				// Make wheatley normal sized
				// $ctrl.wheatleySize = wheatleyDefaultSize;
				// WheatleyHead.animate({r:$ctrl.wheatleySize}, 100);
				// WheatleyBody.animate({r:$ctrl.wheatleySize}, 100);
				// wheatleyPulseSize = $ctrl.wheatleySize + 6;
				// wheatleySuccessSize = $ctrl.wheatleySize + $ctrl.wheatleyBodyStrokeSize/2;
				// wheatleyFailureSize = $ctrl.wheatleySize + 16;
				// wheatleySmallSize = $ctrl.wheatleySize - 30;
				EntireRing.animate({
					transform: 's1,150,150'
				}, 100);
			} else if (data.code === 6) {
				// Success Login code
				// WheatleyHead.animate({r:wheatleyFailureSize}, 80, function() {
				// 	WheatleyBody.animate({'stroke': 'lime'}, 200);
				// 	WheatleyHead.animate({r:$ctrl.wheatleySize}, 200);
				// 	$timeout(function() {
				// 		WheatleyBody.animate({'stroke': '#4AC7EE'}, 100);
				// 	}, 200);
				// });
				DashedRing.animate({
					stroke: '#1DCAFF'
				}, 50);
				InsideRing.animate({
					fill: "#62b231"
				}, 50);
				OutsideRing.animate({
					fill: "#62b231",
					stroke: "#62b231"
				}, 50, function() {
					resetRingColors();
					$rootScope.$broadcast('login:success', {code: 1});
				});
			} else if (data.code === 7) {
				// Make wheatley disappear
				// Don't forget to change the 50 in pin controller as well
				EntireRing.animate({
					transform: 's0.1,150,150'
				}, 100);
				// WheatleyHead.animate({r:0}, 50);
				// WheatleyBody.animate({r:0}, 50);
			}
		}

		

	}	

})();