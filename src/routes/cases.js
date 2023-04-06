const express = require('express');
const router = express.Router();
const casesSchema = require("../models/cases");
const cases = require('../models/cases');

// create cases
router.post('/cases', (req, res) => {
    const cases = casesSchema(req.body);
    cases
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});


// get all cases
router.get('/cases', (req, res) => {
    casesSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});


// get a case
router.get('/cases/:id', (req, res) => {
    const { id } = req.params;
    casesSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// get a case by document
router.get('/case/:document', async (req, res) => {
    try {
      const resultado = await cases.findOne({ document: req.params.document });
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error interno del servidor');
    }
  });

module.exports = router;