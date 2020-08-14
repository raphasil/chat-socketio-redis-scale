(function() {
  'use strict';

  angular.module('common.core').controller('RootController', RootController);

  RootController.$inject = ['$scope', 'authService', 'socketService', '$log'];
  function RootController($scope, authService, socketService, $log) {

    let vm = this;
    vm.userData = {};

    vm.isUserLoggedIn = function() {
      return authService.isUserLoggedIn();
    };

  }

})();
