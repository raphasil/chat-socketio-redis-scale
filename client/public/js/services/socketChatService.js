(function() {
  'use strict';

  angular.module('common.core').factory('socketChatService', socketService);

  socketService.$inject = ['socketFactory', '$log', '$rootScope', 'config'];

  function socketService(socketFactory, $log, $rootScope, config) {

    const socket = socketFactory({
      ioSocket: io.connect('http://localhost:8080/chat'),
    });

    socket.on('connect', function() {
      $log.debug('you have been connect');
      socket.emit('test', 'first test');
    });

    socket.on('disconnect', function() {
      $log.debug('you have been disconnected');
    });

    socket.on('reconnect', function() {
      $log.debug('you have been reconnected');
    });

    socket.on('reconnect_error', function() {
      $log.debug('attempt to reconnect has failed');
    });

    socket.on('message', function(message) {
      $log.debug('receive message', message);
    });

    socket.on('test', function(message) {
      $log.debug('receive test', message);
    });

    return socket;
  }
})(angular.module('common.core'));
