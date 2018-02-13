(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('Degrees')
        .component('courses', {
            templateUrl: 'components/degreeInfo/courses/_.html',
            controller: CoursesController,
            controllerAs: '$ctrl',
            bindings: {
                courses: '=',
                yearNumber: '='
            },
        });

    CoursesController.$inject = ['$scope'];
    function CoursesController($scope) {
        const $ctrl = this;
        const semesterOrder = ["fall", "summer", "winter"]
    
        
        
        /////////////////////////////

        //$scope.orderSemesters = semester => semesterOrder.findIndex(n => n == Object.keys(semester)[0].toLowerCase())

    }
})();