const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
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
  },
  userId: { //nueva linea para relacionar
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }
},{
  versionKey: false
});

module.exports = mongoose.model('Person', personSchema);