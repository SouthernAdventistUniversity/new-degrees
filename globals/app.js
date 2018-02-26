(function () {
    'use strict';

    angular.module('Degrees', [
        'ngAnimate'
    ])
        .filter('degreeFilter1', $rootScope => (degrees, school) => {
            const filtered_degrees = []
            for (let index in degrees) {
                let degree = degrees[index]
                if (!!$rootScope.activePrograms.find(program => degree.level.includes(program) || program == "All Programs"))
                    if (!!$rootScope.activeSchools.find(item => school == item || item == "All Schools") && degree.school == school)
                            filtered_degrees.push(degree)
            }
            return filtered_degrees
        })
        .directive('fadeIn', function ($timeout) {
            return {
                restrict: 'A',
                link: function ($scope, $element, attrs) {
                    $element.addClass("ng-hide-remove");
                    $element.on('load', function () {
                        $element.addClass("ng-hide-add");
                    });
                }
            };
        })


})();