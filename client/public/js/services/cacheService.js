(function() {
  'use strict';

  angular.module('common.core').factory('cacheService', cacheService);

  cacheService.$inject = ['$http', '$rootScope', '$q', '$log'];

  function cacheService($http, $rootScope, $q, $log) {

    const self = {};

    self.getUser = function() {
      checkCache();
      return $rootScope.cache.user;
    };

    self.setUser = function(user) {
      checkCache();
      $rootScope.cache.user = user;
    };

    self.getAuthToken = function() {
      checkCache();
      return $rootScope.cache.token.auth;
    };

    self.setAuthToken = function(token) {
      checkCache();
      $rootScope.cache.token.auth = token;
      updateCache();
    };

    self.getEmailConfirmToken = function() {
      checkCache();
      return $rootScope.cache.token.emailConfirme;
    };

    self.setEmailConfirmToken = function(token) {
      checkCache();
      $rootScope.cache.token.emailConfirme = token;
      updateCache();
    };

    self.clearCache = function(token) {
      $rootScope.cache = {};
      updateCache();
    };

    const checkCache = function() {

      if(!$rootScope.cache) {
        $rootScope.cache = {
          token: {},
        };
      }

      if(!$rootScope.cache.token) {
        $rootScope.cache.token = {};
      }

    };

    const updateCache = function() {

      if(!$rootScope.cache) {
        $rootScope.cache = {
          token: {},
        };
      }

      if(!$rootScope.cache.token) {
        $rootScope.cache.token = {};
      }

    };

    return self;
  }
})();
