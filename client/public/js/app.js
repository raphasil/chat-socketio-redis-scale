(function() {
  'use strict';

  angular.module('app', ['common.core', 'common.ui'])
        .constant('config', { host: 'http://localhost:3000' })
        .config(configRoute)
        .run(run);

  configRoute.$inject = ['$routeProvider', '$locationProvider'];
  function configRoute($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
            .when('/', {
              templateUrl: 'views/home.html',
              controller: 'IndexController',
              controllerAs: 'indexCtrl',
            })
            .when('/me', {
              templateUrl: 'views/profile/me.html',
              controller: 'MeController',
              controllerAs: 'meCtrl',
            })
            .when('/login', {
              templateUrl: 'views/login.html',
              controller: 'LoginController',
              controllerAs: 'loginCtrl',
            })
            .when('/register', {
              templateUrl: 'views/register.html',
              controller: 'RegisterController',
              controllerAs: 'registerCtrl',
            }).otherwise({ redirectTo: '/' });
  }

  run.$inject = ['$rootScope', 'authService', '$http', '$log', 'cacheService'];
  function run($rootScope, authService, $http, $log, cacheService) {

    let token = cacheService.getAuthToken();

    if (token) {
      $http.defaults.headers.common.Authorization = 'Bearer ' + token;
      return authService.updateAuth();
    }
  }

  isAuthenticated.$inject = ['authService', '$rootScope', '$location'];
  function isAuthenticated(authService, $rootScope, $location) {
    if (!authService.isUserLoggedIn()) {
      $rootScope.previousState = $location.path();
      $location.path('/login');
    }
  }

})();
