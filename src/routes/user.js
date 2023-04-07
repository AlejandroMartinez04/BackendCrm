const express = require('express');
const router = express.Router();
const userSchema = require('../models/user');
const user = require('../models/user');
const { default: mongoose, Types } = require('mongoose');

 router.get('/', (req, res) => {
    res.json({
        status: 'API Works!'
    });
 });

// create user
router.post('/users', (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// get all users
router.get('/users', (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// // get a user for _id
// router.get('/users/:id', (req, res) => {
//     const id = req.params;
//     userSchema
//         .findById(id)
//         .then((data) => res.json(data))
//         .catch((error) => res.json({message: error}));
// });

// get a user by document
router.get('/user/:document', async (req, res) => {
    try {
      const resultado = await user.findOne({ document: req.params.document });
      res.json(resultado);
    } catch (error) {
      console.log(error);
      res.status(500).send('Error interno del servidor');
    }
  });


// update a user
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const {document, name, age, country, services, email } = req.body;
    userSchema
        .updateOne({_id: id }, { $set: {document, name, age, country, services, email} })
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

// delete a user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
        .remove({_id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({message: error}));
});

module.exports = router;