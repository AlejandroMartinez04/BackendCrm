const express = require('express');
const router = express.Router();
const personSchema = require('../models/person');
const person = require('../models/person');
const { default: mongoose, Types } = require('mongoose');


// get all people
router.get('/person', (req, res) => {
    personSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// get a person by document
router.get('/person/:document', async (req, res) => {
    try {
      const resultado = await person.findOne({ document: req.params.document });
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error interno del servidor');
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

module.exports = router;