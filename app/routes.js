// app/routes.js

// grab the photo model we just created
var Photo = require('./models/photo');

module.exports = function(app) {

    // server routes ================================
    // handle things like api calls
    // authentication routes

    // sample api routes
    app.get('/photos/list', function(req, res) {
           // use mongoose to get all nerds in the database
           /*Photo.find(function(err, photos) {

               // if there is an error retrieving , send the error.
               // nothing after res.send(err) will execute
               if (err) {
                    res.send(err);
               }

               // return all photos in JSON
               res.json(photos);
           });*/

           var photos = [
            {
               id: 1,
               path: '/uploads/Selection_097.png'
            },
            { id: 2,
              path: '/uploads/Selection_098.png'
           }
         ];
         res.json(photos);
//         res.statusCode = 401;
//         res.send('Custom error message');
    });

    app.get('/photos/list/:id/details', function(req, res) {

      var result = {
        id : 1,
        width: 1000,
        height: 255
      };
//      res.json(result);
        res.statusCode = 505;
        res.send('custom retrieve photo dimension error.');
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
