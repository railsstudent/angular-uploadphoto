
var fs = require('fs');

module.exports = {

  isImage: function _isImage(file) {
    var contentType = file.headers['content-type'];
    if (contentType.substring(0, 6) === 'image/') {
       return true;
    }
    return false;
  },

  copyFile: function _copyFile(res, fileObj, callback) {

    var file = fileObj.file;
    var destination_path = fileObj.destination_path;
    if (!file) {
      return;
    }

    console.log('In copyFile - file path: ' + file.path + ', destination path: ' + destination_path);
    var input_stream = fs.createReadStream(file.path);
    var output_stream = fs.createWriteStream(destination_path);
    input_stream.pipe(output_stream);

    input_stream.on('end',function() {
         fs.unlinkSync(file.path);
         console.log('Uploaded : ', file.path, file.size / 1024 | 0, 'kb',
               file.path, destination_path);
         if (callback) {
            callback(res, fileObj);
         }
    });
  }
};
