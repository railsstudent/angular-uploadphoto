'use strict';

angular.module('UploadPhotoCtrl', []).controller('PhotoController',
  ['$scope', 'UploadPhoto', '_', function ($scope, UploadPhoto, _) {

    $scope.pictureUrlList = [];
    $scope.picFile = null;

    // success and error message for getting photo dimension
    $scope.successMessage = '';
    $scope.errMessage = '';

    // error message for upload photo
    $scope.uploadErrorMsg = '';

    $scope.getAll = function _getAll() {

        UploadPhoto.getAll().then (function(response) {
          $scope.pictureUrlList = response.data;
          $scope.successMEssage = 'Photos are loaded successfully!!!!';
          $scope.errMessage = '';
        }, function(response) {
          $scope.pictureUrlList = [];
          $scope.successMessage = '';
          $scope.errMessage = 'Fail to load photos. Status: ' +  response.status + ', error: ' + response.data;
        });
    };

    $scope.getDimension = function _getDim(id) {
      console.log('getDimension: id = ' + id);
      UploadPhoto.get(id).then (function (response) {
         var result = response.data;
         var matchedPic = _.find($scope.pictureUrlList, function(o) {
             return o._id === result._id;
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
      }, function(response) {
         $scope.successMessage = '';
         $scope.errMessage = 'Fail to load dimensions of photo. Status: ' +
            response.status + ', error: ' + response.data;
      });

      /*var result = {
        id : id + 1,
        width: 1000,
        height: 255
      };*/
    };

    $scope.uploadPhoto = function _uploadPhoto(file) {

    };

    $scope.getAll();
  }]);
