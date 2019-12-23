//var DB = require('../models/DB');
var BaseController = require("./Base"),
	View = require("../views/Base")

module.exports = BaseController.extend({ 
	name: "hrhome",
	run: function(req, res, next) {
        if(req.session.hr_name){
		var v = new View(res, 'hrhome');
            v.render({
                name: req.session.hr_name,
            });
        }else{
            res.redirect('/hr/login');
        }
	},
});