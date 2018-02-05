(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('Degrees')
        .component('list', {
            templateUrl: 'components/degreeFinder/list/_.html',
            controller: ListController,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    ListController.$inject = ['$scope', '$http', '$rootScope'];
    function ListController($scope, $http, $rootScope) {
        $rootScope.degreeSearch = ''


        ///////////////////////////

        $http.get('//staging.southern.edu/departments').then(e => {
            const data = e.data
            const schools = [];
            $rootScope.degree_list = data;
            console.log($rootScope.degree_list)
            data.forEach(degree => {
                if (schools.indexOf(degree.school) === -1)
                    schools.push(degree.school);
            })
            $scope.schools = schools;
            console.log($scope.schools)
        });

        $scope.openDegree = degree => {
            $rootScope.activeDegree = degree;
            $rootScope.openDegree = true
        }

    }
})();