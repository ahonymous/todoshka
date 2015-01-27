angular.module('todoshka', ['routing', 'ui.router'])
    .config(function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
    });
