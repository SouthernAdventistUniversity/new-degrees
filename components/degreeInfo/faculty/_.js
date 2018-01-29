(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('Degrees')
        .component('faculty', {
            templateUrl: 'components/degreeInfo/faculty/_.html',
            controller: FacultyController,
            controllerAs: '$ctrl',
            bindings: {
                faculty: '=',
                ratio: '='
            },
        });

    FacultyController.$inject = ['$scope'];
    function FacultyController($scope) {
        const $ctrl = this;


    }
})();