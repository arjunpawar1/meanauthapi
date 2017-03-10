const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const users = require('./routes/users');
const port = 3000;
const config = require('./config/database');

//to create connection to MongoDB
mongoose.connect(config.database);

//On Connection
mongoose.connection.on('connected', () => {
    console.log('connected to database' + config.database);
});

//On Error
mongoose.connection.on('error', (error) => {
    console.log('Database Error: ' + error);
});

//for cross-browser request
app.use(cors());

//enable body-parser Middlware to get data from the submitted form
app.use(bodyParser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//second parameter is whre it will go for anything which has /users. it is included at the top
app.use('/users', users);

app.get('/', (req, res) => {
    res.send('Invalid End point');
});

//by default every route will go to index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

//start the server
app.listen(port, () => {
    console.log('server started on the port ' + port);
});