const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  document: {
    type: Number, 
    required: true
  },
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
},{
  versionKey: false
});

module.exports = mongoose.model('User', userSchema);