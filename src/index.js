const express = require ('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const app = express ();
const bodyParser = require('body-parser');
const { mongoose } = require('./database');
const userRoutes = require("./routes/user");
const casesRoutes = require("./routes/cases");
const personRoutes = require("./routes/person");
const employeeRoutes = require("./routes/employee");

//const whiteList = ['https://sadimi-suj6.onrender.com'];

app.use(cors()); // Permite todas las conexiones

//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json()); 

//routes
app.use('/api', userRoutes);
app.use('/api', casesRoutes);
app.use('/api', personRoutes);
app.use('/api', employeeRoutes);


app.get("/", (req,res) => {
    res.send("Welcome to sadimi");
});

//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});