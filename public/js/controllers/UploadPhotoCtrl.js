angular.module('UploadPhotoCtrl', []).controller('PhotoController',
  ['$scope', 'UploadPhoto',  function ($scope, UploadPhoto) {

    $scope.pictureUrlList = [];
    $scope.picFile = null;

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
    };

    $scope.uploadPhoto = function _uploadPhoto(file) {

    };

    $scope.getAll();
  }]);
