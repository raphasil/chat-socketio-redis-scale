(function() {
  'use strict';

  angular.module('common.core').controller('LoginController', LoginController);

  LoginController.$inject = ['$scope', 'authService', 'notificationService', '$rootScope', '$location', '$log'];

  function LoginController($scope, authService, notificationService, $rootScope, $location, $log) {
    let vm = this;
    vm.pageClass = 'page-login';
    vm.user = {
      email: '',
      password: '',
    };

    vm.login = function(valid) {
      if (!valid) return;

      authService
      .login(vm.user.email, vm.user.password)
      .then(function(user) {
        $log.debug(user);
        notificationService.success('form.login.success');

        if ($rootScope.previousState) {
          $location.path($rootScope.previousState);
        } else {
          $location.path('/');
        }
      }, function(err) {
        $log.error(err);
        notificationService.error('form.login.error');
      });
    };
  }

})();
