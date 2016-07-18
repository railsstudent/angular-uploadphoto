angular.module('sampleApp',
['ngRoute', 'appRoutes', 'UploadPhotoCtrl', 'UploadPhotoService', 'ngFileUpload'])
.constant('_', window._)
.run(['$rootScope', function($rootScope) {
  $rootScope._ = window._;
}]);
