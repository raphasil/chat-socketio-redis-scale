(function() {
  'use strict';

  angular.module('common.core').controller('MeController', MeController);

  MeController.$inject = ['$scope', 'userService', 'notificationService', '$rootScope', '$location', '$log'];

  function MeController($scope, userService, notificationService, $rootScope, $location, $log) {
    let vm = this;
    vm.pageClass = 'page-profile-me';

    vm.me = {};

    vm.init = function() {

      userService.me()
      .then(function(result) {
        $log.debug(result);
        vm.me = result;
      },
      function(err) {
        $log.error(err);
        notificationService.error(err.message);
      });

    };

    vm.init();
  }

})();
