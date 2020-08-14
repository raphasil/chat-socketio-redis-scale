(function() {
  'use strict';

  angular.module('common.core').factory('userService', userService);

  userService.$inject = ['notificationService', '$http', '$rootScope', '$q', 'config'];

  function userService(notificationService, $http, $rootScope, $q, config) {
    const url = config.host + '/api/v1/user';

    const self = {};

    self.register = function(user) {
      let deferred = $q.defer();

      deferred.notify('iniciando register');

      $http.post(url, user).then(function(response) {
        deferred.resolve(response.data);
      }, function(err) {
        deferred.reject(err.data);
      });

      return deferred.promise;
    };

    self.me = function() {

      let deferred = $q.defer();

      deferred.notify('iniciando register');

      $http.get(url).then(function(result) {
        deferred.resolve(result.data);
      }, function(err) {
        deferred.reject(err.data);
      });

      return deferred.promise;

    };

    return self;
  }
})();
