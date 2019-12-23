var DB = require('../models/DB');
var back = require('express-back');
var BaseController = require("./Base"),
	View = require("../views/Base")

module.exports = BaseController.extend({ 
	name: "hrlogin",
	login: function(req, res, next) {
		DB.query("SELECT * from hr where Email = '" + req.body.mail + "' and password = '" + req.body.password + "'"
        , (error, results, fields) => {
                if(results.length > 0){
                    req.session.hr_name = results[0].Name;
                    req.session.hr_email = results[0].Email;
                    req.session.hr_password = results[0].password;
                    res.redirect('/hr/home');
                }else{
                    var v = new View(res, 'hrlogin');
		            v.render({
                        message: "Wrong mail or password!"
                    });	
                }
            });	
        }
});
