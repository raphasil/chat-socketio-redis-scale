(function() {
  'use strict';

  angular.module('common.ui').directive('uiTopbarDirective', topBar);

  function topBar() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/views/topBar.html',
    };
  }

})();
