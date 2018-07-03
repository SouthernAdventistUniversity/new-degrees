(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    angular
        .module('Degrees')
        .component('degreeInfo', {
            templateUrl: 'components/degreeInfo/_.html',
            controller: DegreeInfoController,
            controllerAs: '$ctrl',
            bindings: {
                degreeId: '=',
            },
        });

    DegreeInfoController.$inject = ['$scope', '$http', '$rootScope','$timeout'];
    function DegreeInfoController($scope, $http, $rootScope, $timeout) {
        const $ctrl = this;
        const courseYears = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh']

        const client = algoliasearch('H1SVP4TWML', '8cb926491f79ad5f094819e1073bdb24');

        $scope.$watch(() => $ctrl.degreeId, degree => {
            if (degree) {
                $scope.degreeLevel = '';
                if(degree.degree.includes(', ')) {
                    let splitDegree = degree.degree.split(", ");
                    $scope.degreeLevel = splitDegree[splitDegree.length - 1]
                } else if(degree.degree.includes(' Minor')) {
                    let splitDegree = degree.degree.split(" Minor");
                    console.log("HI", splitDegree)
                    $scope.degreeLevel = "Minor"
                }



                getSummaryAndCourses(degree);
                getCareers(degree);
                getFaculty(degree);
                getFacultyStudentRatio(degree);
            }
            else $rootScope.openDegree = false
        })

        const getSummaryAndCourses = degree => {
            $scope.courses = {};
            $scope.summary = '';
            $scope.yearNumber = 0
            console.log(degree)
            $http.get('http://www.southern.edu/course-sequences/' + degree.id + '.json').then(function (e) {
                $scope.summary = e.data.description
                let courses = [];
                for (let x in e.data.semesters) {
                    let semesterInfo = e.data.semesters[x],
                        year = (semesterInfo.year.toString()).toLowerCase(),
                        semester = (semesterInfo.semester.toString()).toLowerCase(),
                        count = courseYears.findIndex(x => year.includes(x)) + 1;
                    if (!courses[count]) courses[count] = [];
                    let course = {
                        [semester]: {
                            courses: semesterInfo.courses
                        }
                    }
                    courses[count].push(course)
                    count++;
                }
                $scope.courses = courses.filter(n => true);
                console.log($scope.courses)
            });
        }

        const getCareers = degree => {

        }

        const getFaculty = degree => {
            $scope.faculty = [];

            client.initIndex('staff').search(
                {
                    query: degree.school,
                    hitsPerPage: 1000,
                },
                function searchDone(err, content) {
                    console.log('staff search', content.hits)
                    var empty = false;
                    var staff = [];
                    content.hits.forEach(employee => {
                       
                        staff.push(employee);
                    })

                    $timeout(function () {
                        $scope.faculty = staff;
                    })
                    empty = !content.hits.length;
                }
            );


            // $http.get('http://www.southern.edu/api/people-search/' + degree.school + '/prof_by_area').then(res => {
            //     let response = res.data;
            //     Object.keys(response).forEach(email => response[email].Bio = decodeHtml(response[email].Bio));
            //     Object.keys(response).forEach(staff => $scope.faculty.push(response[staff]))
            //     //$scope.faculty = response;
            //     console.log($scope.faculty )
            // });
        }

        const getFacultyStudentRatio = degree => {
            $scope.ratio = 0;
            $http.get('http://staging.southern.edu/fts?department=' + degree.school.replace("School of", "").replace("Allied Health", "Biology") + '&term=Fall%202016').then(res => {
                $scope.ratio = Math.floor(res.data);
                console.log($scope.ratio)
            });
        }

        const decodeHtml = html => {
            let txt = document.createElement("textarea");
            txt.innerHTML = html;
            return txt.value;
        }

        $scope.degreeFilter = degree => (degree.school == $ctrl.degreeId.school) && (degree.degree != $ctrl.degreeId.degree)

        $scope.openDegree = degree => {
            $rootScope.activeDegree = degree;
            $rootScope.openDegree = true
        }
    }
})();