import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import Config from './config/config';
import Database from './config/db';
var mongoose = require('mongoose');
var app = express();

var users_routes = require("./routes/user");


// Mongoose connection with mongodb
mongoose.Promise = require('bluebird');
mongoose.connect(Database.database)
.then(() => { // if all is ok we will be here
	console.log('Start');
  })
  .catch(err => { 
	  console.error('App starting error:', err.stack);
	  process.exit(1);
  });

const { port } = Config;

app.get('/', (req, res) => {
  console.log("DATA",req);
	res.json({ status: 'OK' });
});

app.use(cors());
//app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/',users_routes);
// Start the server
app.listen(port, function(){
  console.log('Server is running on Port: ',port);
});

module.exports = app;
