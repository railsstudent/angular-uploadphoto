// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// db collection is photos
var PhotoSchema = new Schema({
  filename: String,
  path: String ,
  height: Number,
  width: Number
});


// define our photo model
// module.exports allows use to pass this to other files when it is called
module.exports = mongoose.model('Photo', PhotoSchema);
