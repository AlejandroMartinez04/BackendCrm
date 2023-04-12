const express = require('express');
const router = express.Router();
const employeeSchema = require('../models/employee');
const employee = require('../models/employee');
const { default: mongoose, Types } = require('mongoose');


// get all employee
  router.get('/employee', (req, res) => {
      employeeSchema
          .find()
          .then((data) => res.json(data))
          .catch((error) => res.json({message: error}));
  });


//get a employee by username
  router.get('/employee/:username', async (req, res) => {
    try {
      const resultado = await employee.findOne({ username: req.params.username });
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error interno del servidor');
    }
  });

  //get a employee by document
  router.get('/employee/:document', async (req, res) => {
    try {
      const resultado = await employee.findOne({ document: req.params.document });
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error interno del servidor');
    }
  });


  // update a employee by username
  router.patch('/employee/:username', (req, res) => {
    const { username } = req.params;
    const { password } = req.body;
    employeeSchema
    // aca se cifraria la password //
        .updateOne({ username }, { $set: { password } })
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// const bcrypt = require('bcrypt');

// async function cifrarContrasena(password,saltRounds) {
//   bcrypt.hash(password, saltRounds, (err, hash) => {
//   if (err) {
//     return res.json({ message: 'Error al cifrar la contraseña' })
//   }})
// }

module.exports = router;