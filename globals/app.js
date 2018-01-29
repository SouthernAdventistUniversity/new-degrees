(function() {
    'use strict';

    angular.module('Degrees', [
        'ngAnimate'
    ])

    .filter('orderSemesters', semester => {
        $scope.semesterOrder = ["fall", "summer", "winter"]
        console.log(semester)
    })
})();