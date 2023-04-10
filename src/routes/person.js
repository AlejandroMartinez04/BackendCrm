const express = require('express');
const router = express.Router();
const personSchema = require('../models/person');
const person = require('../models/person');
const user = require('../models/user');
const { default: mongoose, Types } = require('mongoose');

// create a person
router.post('/person', (req, res) => {
  const person = personSchema(req.body);
  person
      .save()
      .then((data) => res.json(data))
      .catch((error) => res.json({message: error}));
});


// get all person
router.get('/person', (req, res) => {
    personSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// // get a person by document
// router.get('/person/:document', async (req, res) => {
//     try {
//       const resultado = await person.findOne({ document: req.params.document });
//       res.json(resultado);
//     } catch (error) {
//       console.log(error);
//       res.status(500).send('Error interno del servidor');
//     }
//   });


// get a person with user by document
router.get('/person/:documents', async (req, res) => {
  try {
     const people = await person.findOne({ document: req.params.documents })
      .populate({path:'userId', select: '-_id'})
      .exec();
       res.json(people);
  } catch (error) {
      console.log(error);
      res.status(500).send('Error retrieving users');
  }
});



// get a person by _id
  router.get('/person/:id', (req, res) => {
    const { id } = req.params;
    personSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// update a user by document
router.patch('/person/:document', (req, res) => {
  const { document } = req.params;
  const { name, email, age, gender, contact, address} = req.body;
  personSchema
      .updateOne({ document }, { $set: { name, email, age, gender, contact, address} })
      .then((data) => res.json(data))
      .catch((error) => res.json({message: error}));
});

module.exports = router;