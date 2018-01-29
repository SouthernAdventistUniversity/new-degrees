(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('Degrees')
        .component('degreeFinder', {
            templateUrl: 'components/degreeFinder/_.html',
            controller: DegreeFinderController,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    DegreeFinderController.$inject = ['$scope'];
    function DegreeFinderController($scope) {
        var $ctrl = this;
        

        ////////////////

        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
    }
})();