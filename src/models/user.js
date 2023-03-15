const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
 name: {
    type: String, 
    required: true
 },
 age: {
  type: Number,
  required: true
},
 country: {
   type: String,
   required: true
 },
 services: {
   type: String,
   required: true
 },
 email: {
   type: String,
   required: true
 }
});

module.exports = mongoose.model('User', userSchema);