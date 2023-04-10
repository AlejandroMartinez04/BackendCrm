const express = require('express');
const router = express.Router();
const casesSchema = require('../models/cases');
const Cases = require('../models/cases');
const { default: mongoose, Types } = require('mongoose');

// // create cases
// router.post('/cases', (req, res) => {
//     const cases = casesSchema(req.body);
//     cases
//         .save()
//         .then((data) => res.json(data))
//         .catch((error) => res.json({message: error}));
// });

// // //
// function crearNuevo (){
//         const objeto = {
//           document: req.params.document,
//           Array:[
//             req.body
//           ]}
//           const ob = casesSchema(objeto);
//           ob
//             .save()
//             .then((data) => res.json(data))
//             .catch((error) => res.json({message: error})
//           );
// }
// //

// codigo bueno
router.patch('/cases/:document', async (req, res) => {
  try {
    const cases = await Cases.findOne({ document: req.params.document });

    if (!cases) {
      res.status(404).json({ message: 'No se encontraron casos para este documento, se ha creado uno nuevo' });
    }
    const newCase = req.body;
    cases.Array.push(newCase);
    await cases.save();
    res.json(cases);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error en el servidor.' });
  }
});
//


// get all cases
router.get('/cases', (req, res) => {
  casesSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});


// // get a case by _id
// router.get('/cases/:id', (req, res) => {
//     const { id } = req.params;
//     casesSchema
//         .findById(id)
//         .then((data) => res.json(data))
//         .catch((error) => res.json({message: error}));
// });

// get a case by document
router.get('/cases/:document', async (req, res) => {
  try {
    const resultado = await cases.findOne({ document: req.params.document });
    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error interno del servidor');
  }
});


module.exports = router;