(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('Degrees')
        .component('summary', {
            templateUrl: 'components/degreeInfo/summary/_.html',
            controller: SummaryController,
            controllerAs: '$ctrl',
            bindings: {
                summary: '=',
            },
        });

    SummaryController.$inject = ['$scope'];
    function SummaryController($scope) {
        const $ctrl = this;
        
    }
})();