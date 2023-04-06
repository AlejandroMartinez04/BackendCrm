const mongoose = require('mongoose');

const casesSchema = mongoose.Schema({
    document: {
       type: String, 
       required: true
    },
    description: {
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
    },
    date: {
        type: String,
        required: true
    }

   });
   
   module.exports = mongoose.model('cases', casesSchema);