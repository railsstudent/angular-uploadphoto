// app/routes.js

// grab the photo model we just created
var Photo = require('./models/photo');
var util = require('util'),
    multiparty = require('multiparty'),
    uuid = require('node-uuid'),
    fs = require('fs');

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

      Photo.findById(req.params.id, '_id width height ', function(err, photo) {
          console.log( 'Inside Photo.findById');
          if (err) {
            res.send(err);
          }

          console.log(photo);
          // return a photo in JSON
          res.json(photo);
      });
    });

//    var multipartyMiddleware = multiparty();
    app.post('/photo/upload', function (req, res) {

        console.log('in /photo/upload route');

        var size = '';
        var file_name = '';
        var destination_path = '';

        //console.log(req.pic);
        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
          console.log('in parse event');
          console.log(util.inspect({fields: fields, files: files}));
          if (err) {
             res.send(err);
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
          file_name = file.originalFilename;
          var temporal_path = file.path;
          size = file.size;
          var extension = temporal_path.substring(file.path.lastIndexOf('.'));
          var destination_path = __dirname + '/../uploads/' + uuid.v4() + extension;
          console.log('file name: ' + file_name + ', temp path: ' + temporal_path
               + ', size: ' + size + ', destination_path: ' + destination_path);

          var input_stream = fs.createReadStream(temporal_path);
          console.log('input_stream created');
          var output_stream = fs.createWriteStream(destination_path);
          console.log('output_stream created');

          input_stream.pipe(output_stream);
          console.log('pipe input stream to output stream');

          input_stream.on('end',function() {
               fs.unlinkSync(temporal_path);
               console.log('Uploaded : ', file_name, size / 1024 | 0, 'kb',
                 file.path, destination_path);
          });
          console.log('Upload completed!');
          //res.setHeader('text/plain');
          res.end('Received ' + size + ' bytes.');
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
