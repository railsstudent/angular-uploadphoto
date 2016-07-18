angular.module('sampleApp',
['ngRoute', 'appRoutes', 'UploadPhotoCtrl', 'UploadPhotoService'])
.constant('_', window._)
.run(['$rootScope', function($rootScope) {
  $rootScope._ = window._;
}]);
