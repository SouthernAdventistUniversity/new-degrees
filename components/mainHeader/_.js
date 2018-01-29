(function() {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('Degrees')
        .component('mainHeader', {
            templateUrl: 'components/mainHeader/_.html',
            controller: HeaderController,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    HeaderController.$inject = ['$scope', '$window', '$timeout'];
    function HeaderController($scope, $window, $timeout) {

        $scope.windowScrollPosition = 0;

        angular.element($window).bind('scroll', e => {
            $timeout(() => {
                $scope.windowScrollPosition = (($window.scrollY - document.body.scrollHeight + $window.innerHeight + 250) / 100)
            })
        })
    }
})();