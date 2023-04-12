const express = require('express');
const router = express.Router();
const casesSchema = require('../models/cases');
const Cases = require('../models/cases');
const { default: mongoose, Types } = require('mongoose');
const axios = require('axios');
const fs = require('fs');
const nodemailer = require('nodemailer');

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


// get a case by document funciona descomentar ---------------------------------------
router.get('/cases/:document', async (req, res) => {
  try {
    const resultado = await Cases.findOne({ document: req.params.document }).select('-_id').lean();
    res.json(resultado);
  } catch (error) {
    console.log(error);
    res.status(500).send('Error interno del servidor');
  }
});

// envia pdf por correo que se recibe en el body --- funcional descomentar --------------------
router.post('/pdf/:document', async (req, res) => {
  try {
    const datos = `https://sadimi-eoya.onrender.com/api/cases/${req.params.document}`;
    crearPdf(datos);
    const destinatario = req.body.destinatario;
    setTimeout(() => enviarCorreo(destinatario), 3000);
    res.send('Archivo enviado con exito');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error interno del servidor');
  }
});

function crearPdf(datos) {

  pdfshift('c75832612c7841fabea4b6ade703bc61', { source: datos }).then(function (response) {
    fs.writeFileSync('casosPorDocumento.com.pdf', response.data, "binary", function () { })
  }).catch(function () { })
}

// funcion que crea el pdf y es llamada dentro del endpoint
function pdfshift(api_key, data) {
  return new Promise((resolve, reject) => {
      let asJson = false
      if ('filename' in data || 'webhook' in data) {
          asJson  = true
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

async function enviarCorreo(destinatario) {
  // Crea el objeto transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'sadimi.api@gmail.com',
      pass: 'mvlkwabpqwmicign',
    },
  });

  // Define los detalles del mensaje de correo electrónico
  const mailOptions = {
    from: 'sadimi.api@gmail.com',
    to: destinatario,
    subject: 'Casos en pdf',
    text: 'Se adjuntan casos por documento en un pdf como se fue solicitado, Atentamente: Sadimi S.A',
    attachments: [
      {
        filename: 'casosPorDocumento.com.pdf',
        path: 'casosPorDocumento.com.pdf'
      },
    ],
  };

  // Envía el mensaje de correo electrónico
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Correo electrónico enviado: ' + info.response);
  } catch (error) {
    console.log(error);
  }
}

module.exports = router;