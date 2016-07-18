// app/routes.js

// grab the photo model we just created
var Photo = require('./models/photo');

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

    app.post('/photo/upload', function (req, res) {

    });

    // frontend routes =====================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
      // load our public/index.html
      res.sendfile('./public/index.html');
    });
};
