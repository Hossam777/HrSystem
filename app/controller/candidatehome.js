//var DB = require('../models/DB');
var BaseController = require("./Base"),
	View = require("../views/Base")

module.exports = BaseController.extend({ 
	name: "candidatehome",
	run: function(req, res, next) {
        if(req.session.candidate_name){
		var v = new View(res, 'candidatehome');
            v.render({
                name: req.session.candidate_name,
                examphase: req.session.candidate_examphase,
                isapproved: req.session.candidate_isapproved,
            });
        }else{
            res.redirect('/candidate/login');
        }
	},
});
