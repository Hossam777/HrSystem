var DB = require('../models/DB');
var back = require('express-back');
var BaseController = require("./Base"),
	View = require("../views/Base")

module.exports = BaseController.extend({ 
	name: "candidatelogin",
	login: function(req, res, next) {
		DB.query("SELECT * from candidate where Email = '" + req.body.mail + "' and password = '" + req.body.password + "'"
        , (error, results, fields) => {
                if(results.length > 0){
                    req.session.candidate_name = results[0].Name;
                    req.session.candidate_email = results[0].Email;
                    req.session.candidate_password = results[0].password;
                    req.session.candidate_phone = results[0].phone;
                    req.session.candidate_postionid = results[0].postionid;
                    req.session.candidate_examphase = results[0].examphase;
                    req.session.candidate_iscvapproved = results[0].iscvapproved;
                    res.redirect('/candidate/home');
                }else{
                    var v = new View(res, 'candidatelogin');
		            v.render({
                        message: "Wrong mail or password!"
                    });	
                }
            });	
        },
    signup: function(req, res, next){
        DB.query("INSERT INTO candidate (Email, password, name, phone, cv, positionid, examphase) VALUES ('" + req.body.mail + "', '" + req.body.password + "', '" + req.body.name + "', '" + req.body.phone + "', '" + req.file.filename + "', '" + req.body.position + "', 1)"
        , (error, results, fields) => {
    		if(error){
                console.log(error);
                redirect.back();
            }else{
                req.session.candidate_name = req.body.name;
                req.session.candidate_email = req.body.mail;
                req.session.candidate_password = req.body.password;
                req.session.candidate_phone = req.body.phone;
                req.session.candidate_postionid = req.body.postion;
                req.session.candidate_examphase = 1;
                res.redirect('/candidate/home');
            }
  		});
    }
});
