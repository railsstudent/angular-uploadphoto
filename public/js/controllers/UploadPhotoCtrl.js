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

        /* response data */
        /*
          [ { _id, path }
          ]
        */
        UploadPhoto.getAll().then (function(response) {
          $scope.pictureUrlList = response.data;
          $scope.successeEssage = 'Photos are loaded successfully!!!!';
          $scope.errMessage = '';
        }, function(response) {
          $scope.pictureUrlList = [];
          $scope.successMessage = '';
          $scope.errMessage = 'Failed to load photos. Status: ' +  response.status + ', error: ' + response.data;
        });
    };

    $scope.getDimension = function _getDim(id) {
      console.log('getDimension: id = ' + id);

      /* returned object */
      /*var result = {
        id : 1,
        width: 1000,
        height: 255
      };*/

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
         $scope.errMessage = 'Failed to load dimensions of photo. Status: ' +
            response.status + ', error: ' + response.data;
      });
    };

    $scope.uploadPhoto = function _uploadPhoto(file) {
       var uploadPromise = UploadPhoto.create(file);
       uploadPromise.then(function (response) {
          file = null;
          file.result = response.data;

       }, function (response) {
           file = null;
           $scope.uploadErrorMsg = 'Failed to upload photo. Status: ' + response.status
                + ', error: ' + response.data;
       }, function(evt) {
           // Math.min is to fix IE which reports 200% sometimes
           file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
       });
    };

    $scope.getAll();
  }]);
