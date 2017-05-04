(function() {
  'use strict';

  angular.module('common.core').controller('TobBarController', TobBarController);

  TobBarController.$inject = ['$scope', '$location', 'authService', '$rootScope', 'cacheService'];
  function TobBarController($scope, $location, authService, $rootScope, cacheService) {

    let vm = this;

    vm.userStatusOptions = [
      {
        title: 'Online',
        icon: 'icon-checkbox-marked-circle',
        color: '#4CAF50',
      },
      {
        title: 'Away',
        icon: 'icon-clock',
        color: '#FFC107',
      },
      {
        title: 'Do not Disturb',
        icon: 'icon-minus-circle',
        color: '#F44336',
      },
      {
        title: 'Invisible',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#BDBDBD',
      },
      {
        title: 'Offline',
        icon: 'icon-checkbox-blank-circle-outline',
        color: '#616161',
      },
    ];

    vm.languages = {
      en: {
        title: 'English',
        translation: 'English',
        code: 'en',
        flag: 'us',
      },
      es: {
        title: 'Spanish',
        translation: 'Spanish',
        code: 'es',
        flag: 'es',
      },
      tr: {
        title: 'Portuguese',
        translation: 'Portuguese',
        code: 'pt',
        flag: 'pt',
      },
    };

    vm.getUserLoginName = function() {
      let user = cacheService.getUser();
      if (user) {
        let firstName = user.info.firstName;
        return firstName;
      }

      return '';
    };

    vm.logout = function() {
      authService.logout();
    };

    vm.me = function() {
      $location.path('/me');
    };

    function init() {

    }

    init();
  }

})();
