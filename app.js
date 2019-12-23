const express = require('express');
const multer = require('multer');
const mysql = require('mysql');
const bodyParser = require('body-parser');
var back = require('express-back');
var session = require('express-session');
const CLogin = require('./app/controller/candidatelogin');
const test = require('./app/controller/test');
const CHome = require('./app/controller/candidatehome');
const CSignup = require('./app/controller/candidatesignup');
const path = require('path');
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

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('cv');

function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /pdf/;//use | for multiple extention
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: pdfs Only!');
  }
}


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
app.all('/candidate/service/signup', function(req, res, next) {
    upload(req, res, (err) => {
    if(err){
          console.log(err);
        res.redirect('/candidate/signup');
    } else {
      if(req.file == undefined){
          console.log("undefined");
        res.redirect('/candidate/signup');
      } else {
          //req.file.filename
          CServices.signup(req, res, next);
      }
    }});
    //CServices.signup(req, res, next);
});

module.exports = app;