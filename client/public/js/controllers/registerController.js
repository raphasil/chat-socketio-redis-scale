(function() {
  'use strict';

  angular.module('common.core').controller('RegisterController', RegisterController);

  RegisterController.$inject = [
    '$scope',
    'userService',
    'notificationService',
    '$rootScope',
    '$location',
    '$log',
  ];

  function RegisterController(
    $scope,
    userService,
    notificationService,
    $rootScope,
    $location,
    $log) {

    let vm = this;
    vm.pageClass = 'page-register';
    vm.user = {
      email: '',
      password: '',
      info: {
        firstName: '',
        lastName: '',
      },
    };

    vm.register = function(valid) {
      if (!valid) return;

      userService
      .register(vm.user)
      .then(function(user) {
        $log.debug(user);
        notificationService.success('form.register.success');

        if ($rootScope.previousState) {
          $location.path($rootScope.previousState);
        } else {
          $location.path('/');
        }
      }, function(err) {
        $log.error(err);
        notificationService.error('form.register.error');
      });
    };

  }

})();
