angular.module('UploadPhotoService', []).factory('UploadPhoto',
  ['$http', function ($http) {

    return {
         // call to get all nerds
         getAll : function _getAll() {
          //   return $http.get('/api/photos') ;
         },


         get : function _get(id) {
          //  return $http.get('/api/photo/' + id);
         },

         // these will work when more API routes are defined on the Node side of things
         // call to POST and create a new nerd
         create : function _create(nerdData) {
          //   return $http.post('/api/nerds', nerdData);
         }

         // call to DELETE a nerd
         /*delete : function _delete(id) {
             return $http.delete('/api/nerds/' + id);
         }*/
    }
}]);
