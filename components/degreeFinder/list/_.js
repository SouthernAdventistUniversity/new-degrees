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

    ListController.$inject = ['$scope', '$http', '$rootScope', '$timeout'];
    function ListController($scope, $http, $rootScope, $timeout) {
        $rootScope.degreeSearch = ''


        ///////////////////////////
        var client = algoliasearch('H1SVP4TWML', '8cb926491f79ad5f094819e1073bdb24');

        $rootScope.$watch('degreeSearch', function () {
            $rootScope.activePrograms = ["All Programs"];
            $rootScope.activeSchools = ["All Schools"];
            client.initIndex('degrees').search(
                {
                    query: $rootScope.degreeSearch,
                    hitsPerPage: 1000,
                },
                function searchDone(err, content) {
                    console.log(content.hits)
                    var schools = [];
                    content.hits.forEach(degree => {
                        if (schools.indexOf(degree.school) === -1)
                            schools.push(degree.school);
                    })

                    $timeout(function () {
                        $rootScope.degree_list = content.hits
                        $rootScope.schools = schools;
                    })
                }
            );
        })


        // $http.get('//staging.southern.edu/departments').then(e => {
        //     const data = e.data
        //     const schools = [];
        //     $rootScope.degree_list = data;
        //     console.log($rootScope.degree_list)
        //     data.forEach(degree => {
        //         if (schools.indexOf(degree.school) === -1)
        //             schools.push(degree.school);
        //     })
        //     $scope.schools = schools;
        //     console.log($scope.schools)
        // });

        $scope.openDegree = degree => {
            $rootScope.activeDegree = degree;
            $rootScope.openDegree = true
        }

    }
})();