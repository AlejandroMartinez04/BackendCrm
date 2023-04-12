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

// const whiteList = ['https://sadimi-suj6.onrender.com','http://localhost:3000'];

// app.use(cors({origin: whiteList }));

var corsOptions = {
    origin: 'http://10.223.152.132',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

//Settings
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json()); 

//Routes
app.use('/api', userRoutes);
app.use('/api', casesRoutes);
app.use('/api', personRoutes);
app.use('/api', employeeRoutes);


app.get("/", cors(corsOptions), function (req, res, next) {
    res.send("Welcome to sadimi");
});



//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Starting server
app.listen(10000, function () {
    console.log(`Server on port ${app.get('port')}`);
});