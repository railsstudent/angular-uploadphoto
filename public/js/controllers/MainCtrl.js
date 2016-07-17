angular.module('MainCtrl', []).controller('MainController',
  ['$scope', 'UploadPhoto',  function ($scope, UploadPhoto) {

    $scope.pictureUrlList = [];
    $scope.picFile = null;
    $scope.dimensionInfo = null;

    $scope.getAll = function _getAll() {

    };

    $scope.getDimension = function _getDim(id) {

    };

    $scope.uploadPhoto = function _uploadPhoto(file) {

    };
  }]);
