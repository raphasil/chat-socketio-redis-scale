(function() {
  'use strict';

  angular.module('common.ui').directive('uiMainDirective', main);

  function main() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/views/main.html',
    };
  }

})();
