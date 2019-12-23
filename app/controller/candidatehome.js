//var DB = require('../models/DB');
var BaseController = require("./Base"),
	View = require("../views/Base")

module.exports = BaseController.extend({ 
	name: "candidatehome",
	run: function(req, res, next) {
        if(req.session.candidate_name){
            if(req.session.candidate_isapproved == null){
                approvedStatus = "You are in the candidates queue";
            }else{
                if(req.session.candidate_isapproved == 0)
                    approvedStatus = "You are rejected";
                else
                    approvedStatus = "You are accepted";
            }
		    var v = new View(res, 'candidatehome');
            v.render({
                name: req.session.candidate_name,
                examphase: req.session.candidate_examphase,
                isapproved: approvedStatus,
            });
        }else{
            res.redirect('/candidate/login');
        }
	},
});
