angular.module('test', [])
    .controller('testCtrl',['$scope','$http', function ($scope, $http) {
        $scope.alert = function () {
            alert("WOW");
        }
    }]);