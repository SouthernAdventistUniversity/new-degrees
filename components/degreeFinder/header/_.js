(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('Degrees')
        .component('header', {
            templateUrl: 'components/degreeFinder/header/_.html',
            controller: DegreeHeaderController,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    DegreeHeaderController.$inject = ['$scope'];
    function DegreeHeaderController($scope) {
        var $ctrl = this;
        

        ////////////////

        $ctrl.$onInit = function() { };
        $ctrl.$onChanges = function(changesObj) { };
        $ctrl.$onDestroy = function() { };
    }
})();