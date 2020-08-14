(function() {
  'use strict';

  angular.module('common.core').factory('notificationService', notificationService);

  notificationService.$inject = ['$mdToast'];

  function notificationService($translate, $mdToast) {

    const self = {};

    const showSuccess = function(message) {
      $mdToast.show(
          $mdToast.simple()
            .textContent(message)
            .position('top right')
            .hideDelay(3000)
        );
    };

    self.success = function(message) {
      showSuccess(message);
    };

    self.error = function(message) {
      showSuccess(message);
    };

    return self;
  }
})(angular.module('common.core'));
