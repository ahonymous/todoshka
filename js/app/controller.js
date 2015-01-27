angular.module('app.controller', [])

    .controller('firstController', function ($scope) {
        $scope.hello = 'testHello';
    })
    .controller('secondController', function ($scope) {
        $scope.hello2 = '222222222222';
    });
