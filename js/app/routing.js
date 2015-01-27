angular.module('routing', ['app.controller', 'ui.router'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('r1', {
                url: '/',
                templateUrl: 'templates/main.html',
                controller: 'firstController'
            })
            .state('r2', {
                url: '/2',
                templateUrl: 'templates/2.html',
                controller: 'secondController'
            });
    });