const mongoose = require('mongoose');

const personSchema = mongoose.Schema({
  document: { 
    type: Number, 
    required: true , 
    unique: true
  },
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  age: { 
    type: Number, 
    required: true 
  },
  gender: { 
    type: String, 
    required: true 
  },
  contact: { 
    type: Number, 
    required: true 
  },
  address: { 
    type: String, 
    required: true 
  }
},{
  versionKey: false
});

module.exports = mongoose.model('Person', personSchema);