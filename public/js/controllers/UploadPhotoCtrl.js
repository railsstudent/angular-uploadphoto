'use strict';

angular.module('UploadPhotoCtrl', []).controller('PhotoController',
  ['$scope', 'UploadPhoto', '_', function ($scope, UploadPhoto, _) {

    $scope.pictureUrlList = [];
    $scope.picFile = null;
    $scope.successMessage = '';
    $scope.errMessage = '';

    $scope.getAll = function _getAll() {

         $scope.pictureUrlList = [
         {
            id: 1,
            path: 'http://localhost:8081/uploads/Selection_097.png',
            dimension: null
         },
         { id: 2,
           path: 'http://localhost:8081/uploads/Selection_098.png',
           dimension: { width: 240, height: 3650 }
        }
       ];
    };

    $scope.getDimension = function _getDim(id) {
      console.log('getDimension: id = ' + id);
      var result = {
        id : id + 1,
        width: 1000,
        height: 255
      };

      var matchedPic = _.find($scope.pictureUrlList, function(o) {
          return o.id === result.id;
      });
      if (matchedPic) {
          matchedPic.dimension = { width: result.width, height: result.height};
          $scope.errMessage = '';
          $scope.successMessage = 'Dimension of picture (' + id + ') is retrieved successfully.';
      } else {
          // show error message
          $scope.successMessage = '';
          $scope.errMessage = 'Unable to find picture with given id: ' + id;
      }
    };

    $scope.uploadPhoto = function _uploadPhoto(file) {

    };

    $scope.getAll();
  }]);
