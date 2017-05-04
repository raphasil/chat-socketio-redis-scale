(function() {
  'use strict';

  angular.module('common.core').factory('authService', authService);

  authService.$inject = ['$http', '$rootScope', '$q', '$log', 'cacheService', 'config'];

  function authService($http, $rootScope, $q, $log, cacheService, config) {
    const url = config.host + '/api/v1/auth';

    const self = {};

    self.login = function(email, password) {
      let deferred = $q.defer();

      let data = { email: email, password: password };

      deferred.notify('iniciando login');

      $http.post(url, data).then(function(response) {
        let user = response.data.user;
        let token = response.data.token;
        saveCredentials(user, token);
        deferred.resolve(user);
      }, function(err) {
        deferred.reject(err.data);
      });

      return deferred.promise;
    };

    self.logout = function() {
      cacheService.clearCache();
      $http.defaults.headers.common.Authorization = '';
    };

    self.isUserLoggedIn = function() {
      let user = cacheService.getUser();
      let token = cacheService.getAuthToken();
      return ( user && token );
    };

    self.updateAuth = function() {
      let deferred = $q.defer();

      deferred.notify('iniciando update auth');

      $http.get(url).then(function(response) {
        let user = response.data.user;
        let token = response.data.token;
        saveCredentials(user, token);
        deferred.resolve(user);
      }, function(err) {
        self.logout();
        deferred.reject(err.data);
      });

      return deferred.promise;
    };

    const saveCredentials = function(user, token) {
      cacheService.clearCache();

      cacheService.setUser(user);
      cacheService.setAuthToken(token);

      $http.defaults.headers.common.Authorization = 'Bearer ' + token;
    };

    return self;
  }
})();
