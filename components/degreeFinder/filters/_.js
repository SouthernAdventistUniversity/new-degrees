(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('Degrees')
        .component('filters', {
            templateUrl: 'components/degreeFinder/filters/_.html',
            controller: FilterController,
            controllerAs: '$ctrl',
            bindings: {
                Binding: '=',
            },
        });

    FilterController.$inject = ['$scope', '$http', '$rootScope'];
    function FilterController($scope, $http, $rootScope) {

        $scope.programs_list = [
            "All Programs",
            "Master",
            "Bachelor",
            "Associate",
            "Minor",
            "Certificate",
            "Non-Degree"
        ]

        $rootScope.activePrograms = ["All Programs"];
        $scope.isProgramOpen = false

        $rootScope.activeSchools = ["All Schools"];
        $scope.isSchoolOpen = false

        //////////////////////

        $scope.modifyActivePrograms = program => {
            if (!!$rootScope.activePrograms.find(active => active == program)) {
                const index = $rootScope.activePrograms.indexOf(program);
                $rootScope.activePrograms.splice(index, 1);
            } else {
                if (program == "All Programs") $rootScope.activePrograms = ["All Programs"];
                else {
                    if (!!$rootScope.activePrograms.find(active => active == "All Programs")) {
                        const index = $rootScope.activePrograms.indexOf("All Programs");
                        $rootScope.activePrograms.splice(index, 1);
                    }
                    $rootScope.activePrograms.push(program)
                }
            }
            if(!$rootScope.activePrograms.length) $rootScope.activePrograms = ["All Programs"]
            console.log($rootScope.activePrograms)
        }

        $scope.modifyActiveSchools = school => {
            console.log(school)
            if (!!$rootScope.activeSchools.find(active => active == school)) {
                const index = $rootScope.activeSchools.indexOf(school);
                $rootScope.activeSchools.splice(index, 1);
            } else {
                if (school == "All Schools") $rootScope.activeSchools = ["All Schools"];
                else {
                    if (!!$rootScope.activeSchools.find(active => active == "All Schools")) {
                        const index = $rootScope.activeSchools.indexOf("All Schools");
                        $rootScope.activeSchools.splice(index, 1);
                    }
                    $rootScope.activeSchools.push(school)
                }
            }
            if(!$rootScope.activeSchools.length) $rootScope.activeSchools = ["All Schools"]
            console.log($rootScope.activeSchools)
        }


        /////////////////////////

    }
})();