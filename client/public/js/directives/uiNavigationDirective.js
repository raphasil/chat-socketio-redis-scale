(function() {
  'use strict';

  angular.module('common.ui').directive('uiNavigationDirective', navigation);

  function navigation() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/views/navigation.html',
    };
  }

})();
