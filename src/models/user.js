const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // document: {
  //   type: Number, 
  //   required: true
  // },
  country: {
    type: String
  },
  service: {
    type: String
  },
  document: {
    type: Number
  }
},{
  versionKey: false
});

module.exports = mongoose.model('User', userSchema);