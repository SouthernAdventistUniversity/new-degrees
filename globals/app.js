(function () {
    'use strict';

    angular.module('Degrees', [
        'ngAnimate'
    ])

        .filter('orderSemesters', semester => {
            $scope.semesterOrder = ["fall", "summer", "winter"]
            console.log(semester)
        })

        .directive('fadeIn', function ($timeout) {
            return {
                restrict: 'A',
                link: function ($scope, $element, attrs) {
                    $element.addClass("ng-hide-remove");
                    console.log("hi")
                    $element.on('load', function () {
                        console.log("bye")
                        $element.addClass("ng-hide-add");
                    });
                }
            };
        })
})();