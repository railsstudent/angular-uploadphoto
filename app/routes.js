// app/routes.js

// grab the photo model we just created
var Photo = require('./models/photo');
var util = require('util'),
    multiparty = require('multiparty'),
    uuid = require('node-uuid'),
    fs = require('fs'),
    sizeOf = require('image-size');

module.exports = function(app) {

    // server routes ================================
    // handle things like api calls
    // authentication routes

    // sample api routes
    app.get('/photos/list', function(req, res) {
           // use mongoose to get all photos in the database
           Photo.find({}, 'path _id',function(err, photos) {

               // if there is an error retrieving , send the error.
               // nothing after res.send(err) will execute
               if (err) {
                    res.send(err);
               }

               // return all photos in JSON
               res.json(photos);
           });
    });

    app.get('/photos/list/:id/details', function(req, res) {

      Photo.findById(req.params.id, '_id filename width height ', function(err, photo) {
          console.log( 'Inside Photo.findById');
          if (err) {
            res.send(err);
          }

          console.log(photo);
          // return a photo in JSON
          res.json(photo);
      });
    });

    var isImage = function _isImage(file) {
      var contentType = file.headers['content-type'];
      if (contentType.substring(0, 6) === 'image/') {
         return true;
      }
      return false;
    }

    var saveNewPhoto = function _saveNewPhoto(res, fileObj) {

        var file = fileObj.file;
        var upload_file_path = fileObj.upload_file_path;
        var dimensions = fileObj.dimensions;

        // create a new photo
        var newPhoto = new Photo();
        newPhoto.filename = file.originalFilename;
        newPhoto.path = upload_file_path;
        newPhoto.width = dimensions.width;
        newPhoto.height = dimensions.height;
        newPhoto.save(function(err) {
          if (err) {
            res.send(err);
          } else {
             console.log('Uploaded completed');
             res.json({
                photo : newPhoto,
                message : 'Uploaded ' + file.originalFilename + ' and received ' + file.size / 1024 + ' kb'
              });
          }
        });
    }

    var copyFile = function _copyFile(res, fileObj, callback) {

      var file = fileObj.file;
      var destination_path = fileObj.destination_path;
      var upload_file_path = fileObj.upload_file_path;
      var dimensions = fileObj.dimensions;
      if (!file) {
        return;
      }

      console.log('In copyFile - file path: ' + file.path + ', destination path: ' + destination_path
          + ", upload file path: " + upload_file_path);
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

    app.post('/photo/upload', function (req, res) {

        console.log('in /photo/upload route');

        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
          console.log('in parse event');
          console.log(util.inspect({fields: fields, files: files}));
          if (err) {
             res.send(err)
          }
          /*
            got file named pic
            { x:
               [ { fieldName: 'pic',
                   originalFilename: 'IMG_4384.JPG',
                   path: '/tmp/HGTJT0-uca0vhJB8fb4435Gy.JPG',
                   headers: [Object],
                   size: 116896 } ] }
          */
          if (files.pic.length > 0) {
              var file = files.pic[0]
              console.log(file);

              // check content type is image
              if (!isImage(file)) {
                  console.log('File is not image.');
                  res.status(400).send('Uploaded file is not an image. Please try again!');
                  return;
              }

              var extension = file.path.substring(file.path.lastIndexOf('.'));
              var upload_file_path = '/uploads/' + uuid.v4() + extension;
              var destination_path = __dirname + upload_file_path;
              console.log('file name: ' + file.originalFilename + ', temp path: ' + file.path
                     + ', upload file path: ' + upload_file_path
                     + ', size: ' + file.size + ', destination_path: ' + destination_path);

              // get dimension of the file
             if (file.path) {
                 sizeOf (file.path, function(err, dimensions) {
                   if (err) {
                       res.send(err);
                   } else {
                      console.log('width: ' + dimensions.width +
                          ', height: ' + dimensions.height);

                      var fileObj = {
                           file: file,
                           upload_file_path : upload_file_path,
                           destination_path : destination_path,
                           dimensions : dimensions
                      };
                      copyFile(res, fileObj, saveNewPhoto);
                    }
                });
              }
           }
        });
    });

    // frontend routes =====================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
      // load our public/index.html
      res.sendfile('./public/index.html');
    });
};
