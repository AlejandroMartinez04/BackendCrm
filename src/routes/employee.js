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

module.exports = router;