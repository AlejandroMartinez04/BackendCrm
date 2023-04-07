const mongoose = require('mongoose');

const casesSchema = mongoose.Schema({
    document: {
       type: Number, 
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
    }
  },{
    timestamps: true,
    versionKey: false
  }
);
   
   module.exports = mongoose.model('Cases', casesSchema);