(function() {
  'use strict';

  angular.module('common.core').controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'notificationService'];

  function IndexController($scope, notificationService) {
    let vm = this;
    vm.pageClass = 'page-home';
  }

})();
