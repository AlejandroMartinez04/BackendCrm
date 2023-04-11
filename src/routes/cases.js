const express = require('express');
const router = express.Router();
const casesSchema = require('../models/cases');
const Cases = require('../models/cases');
const { default: mongoose, Types } = require('mongoose');
const axios = require('axios');
const fs = require('fs');

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
    res.status(201).json('Creado con exito');
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

// get a case by document funciona descomentar ---------------------------------------
router.get('/cases/:document', async (req, res) => {
  try {
    const resultado = await Cases.findOne({ document: req.params.document });
    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error interno del servidor');
  }
});


// // get a case by document 
// router.get('/cases/:document', async (req, res) => {
//   try {
//     const resultado = await Cases.findOne({ document: req.params.document }).lean().select('-_id');
//     res.json(resultado);

//     // pdfshift('009bccf5b30840ad9444cef29b1826d3', { source: resultado }).then(response => {
//     //   fs.writeFileSync('casosPorDocumento.com.pdf', response.data, "binary", function () { })
//     // })

//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Error interno del servidor');
//   }
// });

// funcion que crea el pdf y es llamada dentro del endpoint
function pdfshift(api_key, data) {
  return new Promise((resolve, reject) => {
    let asJson = false
    if ('filename' in data || 'webhook' in data) {
      asJson = true
    }

    axios.request({
      method: 'post',
      url: 'https://api.pdfshift.io/v3/convert/pdf',
      responseType: (asJson ? 'json' : 'arraybuffer'),
      data: data,
      auth: { username: 'api', password: api_key }
    }).then(resolve).catch(response => {
      // Handle any error that might have occured
      reject(response)
    })
  })
}

//Here's a sample of what to do

// pdfshift('009bccf5b30840ad9444cef29b1826d3', { source: 'https://sadimi-eoya.onrender.com/api/cases' }).then(response => {
//   fs.writeFileSync('casosPorDocumento.com.pdf', response.data, "binary", function () { })
// })




module.exports = router;