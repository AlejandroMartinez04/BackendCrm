const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  document: {
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
  }
},{
  versionKey: false
});

module.exports = mongoose.model('User', userSchema);