(function() {
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


        ///////////////////////////

        $http.get('//staging.southern.edu/departments').then(function(e) {
            const data = e.data
            const schools = [];
            $scope.degree_list = data;

            data.forEach(degree => {
                if (schools.indexOf(degree.school) === -1)
                    schools.push(degree.school);
            })
            $scope.schools = schools;
            console.log($scope.schools)
        });

        $scope.degreeFilter = degree => {
            if(!!$rootScope.activePrograms.find(program => degree.level.includes(program) || program == "All Programs"))
                if(!!$rootScope.activeSchools.find(school => degree.school.includes(school) || school == "All Schools"))
                    return true
        }

        $scope.openDegree = degree => {
            $rootScope.activeDegree = degree;
            $rootScope.openDegree = true
        }

    }
})();