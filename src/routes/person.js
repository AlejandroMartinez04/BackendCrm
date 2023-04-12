const express = require('express');
const router = express.Router();
const personSchema = require('../models/person');
const person = require('../models/person');
const User = require('../models/user');
const { default: mongoose, Types } = require('mongoose');

// create a person
router.post('/person', (req, res) => {
  const person = personSchema(req.body);
  person
      .save()
      .then((data) => res.json('creado con exito'))
      .catch((error) => res.json({message: error}));
});

// get all person
router.get('/person', (req, res) => {
    personSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

/// add new service
router.patch('/person/:document', async (req, res) => {
  try {
    const people = await person.findOne({ document: req.params.document })
      .populate({path:'userId'})
      .exec();
      //res.json(people);
      //console.log(people);
      const newService = req.body.service;
      people.userId.services.push(newService);
      console.log(people);
      people.userId.save();
      res.status(201).json('Servicio contratado con exito');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});
///

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

// // update a user by document
// router.patch('/person/:document', (req, res) => {
//   const { document } = req.params;
//   const { name, email, age, gender, contact, address} = req.body;
//   personSchema
//       .updateOne({ document }, { $set: { name, email, age, gender, contact, address} })
//       .then((data) => res.json(data))
//       .catch((error) => res.json({message: error}));
// });

module.exports = router;