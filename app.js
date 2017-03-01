const express = require('express');
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./config/db');

//Database connection
mongoose.connect(dbConfig.database);
mongoose.connection.on('connected',()=>{
    console.log('Connected to database : ' + dbConfig.database);
});
mongoose.connection.on('error',()=>{
    console.log('Connection error to database : ' + dbConfig.database);
});
//Initialise express
const app = express();
const port = 3000;

const usersRoute=require('./routes/users');
//CORS Middleware
app.use(cors());
//bodyParser Middleware
app.use(bodyParser.json())
//passport intialize
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
//set static folder
app.use(express.static(path.join(__dirname,'public')));
//set users routes
app.use('/users',usersRoute);
// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port, () => {
    console.log ('Server started listening on port : ' + port);
});