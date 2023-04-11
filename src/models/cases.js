const mongoose = require('mongoose');

const casesSchema = mongoose.Schema({
  document: {
    type: String
  },
  Array: [{
    description: {
      type: String
    },
    type: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now
    }    
  }]
},{
  versionKey: false
}
);

module.exports = mongoose.model('Cases', casesSchema);



// const casesSchema = new mongoose.Schema({
//   document: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   cases: {
//     type: mongoose.Schema.Types.ObjectId,
//     default: []
//   }
// });

// module.exports = mongoose.model('Cases', casesSchema);
