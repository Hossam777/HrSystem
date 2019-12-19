const express = require('express');
const mysql = require('mysql');
const test = require('./app/controller/test');

const app = express();
app.set('views', __dirname + '/app/templates');
app.set('view engine', 'hjs');

app.all('/', function(req, res, next) {
    test.run(req, res, next);
});

module.exports = app;