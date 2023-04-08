const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    username: {
       type: String, 
       required: true,
       unique: true
    },
    password: {
       type: String,
       required: true
    },
    name: { 
       type: String, 
       required: true 
    },
    gender: { 
       type: String, 
       required: true 
    },
    document: { 
       type: Number, 
       required: true 
    }
    },{
      versionKey: false
  }
);
   
   module.exports = mongoose.model('Employee', employeeSchema);