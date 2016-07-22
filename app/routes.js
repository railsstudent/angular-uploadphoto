// app/routes.js

// grab the photo model we just created
var Promise = require('bluebird');
var Photo = Promise.promisifyAll(require('./models/photo')),
    util = require('util'), multiparty = require('multiparty'),
    uuid = require('node-uuid'),sizeOf = require('image-size'),
    imageUtil = require('./imageUtil');

module.exports = function(app) {

    // server routes ================================
    // handle things like api calls
    // authentication routes

    // sample api routes
    app.get('/photos/list', function(req, res) {
       // use mongoose to get all photos in the database
       Photo.findAsync({}, 'path _id')
          .then (function(photos) {
              console.log('In .then of Photo.findAsync()');
              console.log(photos);
              // return all photos in JSON
              return res.json(photos);
            })
            .catch(function (err) {
              console.log('In .catch of Photo.findAsync()');
              // if there is an error retrieving , send the error.
              // nothing after res.send(err) will execute
              res.send(err);
            });
    });

    app.get('/photos/list/:id/details', function(req, res) {
        Photo.findByIdAsync(req.params.id, '_id filename width height ')
          .then(function(photo) {
              console.log( 'Inside .then of findByIdAsync');
              console.log(photo);
              // return a photo in JSON
              res.json(photo);
          })
          .catch(function(err) {
              console.log('In .catch of Photo.findByIdAsync()');
              res.send(err);
          });
    });

    var saveNewPhoto = function _saveNewPhoto(res, fileObj) {

        var file = fileObj.file;
        var upload_file_path = fileObj.upload_file_path;
        var dimensions = fileObj.dimensions;

        console.log('uploaded file path: ' + upload_file_path);
        console.log('width: ' + dimensions.width + ', height: ' + dimensions.height);

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

    app.post('/photo/upload', function (req, res) {

        console.log('in /photo/upload route');

        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
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
              if (!imageUtil.isImage(file)) {
                  console.log('File is not image.');
                  res.status(400).send('Uploaded file is not an image. Please try again!');
                  return;
              }

              var extension = file.path.substring(file.path.lastIndexOf('.'));
              var upload_file_path = '/uploads/' + uuid.v4() + extension;
              var destination_path = __dirname + upload_file_path;

              // get dimension of the file
             if (file.path) {
                 sizeOf (file.path, function(err, dimensions) {
                    if (err) {
                       res.send(err);
                    } else {
                        imageUtil.copyFile(res,
                          { file: file,
                            upload_file_path : upload_file_path,
                            destination_path : destination_path,
                            dimensions : dimensions
                         }, saveNewPhoto);
                    };
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
