const express = require('express');
const mysql = require('mysql');
const test = require('./app/controller/test');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hrSystem'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const app = express();
app.set('views', __dirname + '/app/templates');
app.set('view engine', 'hjs');

app.all('/', function(req, res, next) {
    test.run(req, res, next);
});

module.exports = app;