const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  country: {
    type: String
  },
  services:{
    type: [String]
  }
},{
  versionKey: false
});

module.exports = mongoose.model('User', userSchema);