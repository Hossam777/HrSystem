const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var session = require('express-session');
const CLogin = require('./app/controller/candidatelogin');
const test = require('./app/controller/test');
const CHome = require('./app/controller/candidatehome');
const CSignup = require('./app/controller/candidatesignup');
///// services
const CServices = require('./app/controller/candidateservices');

const app = express();
app.set('views', __dirname + '/app/templates');
app.set('view engine', 'hjs');

app.set('tryst proxy', 1);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'this is secret',
    resave: false,
    saveUninitialized: true,
}));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, req.body.name)
  }
})

var upload = multer({ storage: storage })


app.all('/', function(req, res, next) {
    CLogin.run(req, res, next);
});
app.all('/test', function(req, res, next) {
    test.run(req, res, next);
});
app.all('/candidate/login', function(req, res, next) {
    CLogin.run(req, res, next);
});
app.all('/candidate', function(req, res, next) {
    CLogin.run(req, res, next);
});
app.all('/candidate/home', function(req, res, next) {
    CHome.run(req, res, next);
});
app.all('/candidate/signup', function(req, res, next) {
    CSignup.run(req, res, next);
});
/////////////////////////////// services
app.all('/candidate/service/login', function(req, res, next) {
    CServices.login(req, res, next);
});
app.all('/candidate/service/signup', upload.single('cv'), function(req, res, next) {
    const file = req.file;
    CServices.login(req, res, next, file);
});

module.exports = app;