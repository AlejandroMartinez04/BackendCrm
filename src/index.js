const express = require ('express');
const morgan = require('morgan');
const path = require('path');
const app = express ();
const { mongoose } = require('./database');
const userRoutes = require("./routes/user")


//Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', userRoutes);


//Routes
app.use('/tasks',require('./routes/user'));

app.get("/", (req,res) => {
    res.send("Welcome to sadimi");
});



//Static files
app.use(express.static(path.join(__dirname, 'public')))

//Starting server
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});