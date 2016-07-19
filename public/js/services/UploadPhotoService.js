angular.module('UploadPhotoService', []).factory('UploadPhoto',
  ['$http', 'Upload', function ($http, Upload) {

    return {
         // call to get all nerds
         getAll : function _getAll() {
             return $http.get('/photos/list');
         },

         get : function _get(id) {
             return $http.get('/photos/list/' + id + '/details/');
         },

         // these will work when more API routes are defined on the Node side of things
         // call to POST and create a new nerd
         create : function _create(picFile) {
             return Upload.upload({
                  url: '/photo/upload',
                  method: 'POST',
                  data: { pic: picFile }
             });
         }
    }
}]);
