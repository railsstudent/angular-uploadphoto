// app/routes.js

// grab the nerd model we just created
var Nerd = require('./models/nerd');

module.exports = function(app) {

    // server routes ================================
    // handle things like api calls
    // authentication routes

    // sample api routes
    app.get('/api/nerds', function(req, res) {
           // use mongoose to get all nerds in the database
           Nerd.find(function(err, nerds) {

               // if there is an error retrieving , send the error.
               // nothing after res.send(err) will execute
               if (err) {
                    res.send(err);
               }

               // return all nerds in JSON
               res.json(nerds);
           });
    });

    // routes to handle creating goes here  (app.post)
    // routes to handle get a photo by id

    // frontend routes =====================================
    // route to handle all angular requests
    app.get('*', function(req, res) {
      // load our public/views/index.html
      res.sendfile('./public/index.html');
    });



};
