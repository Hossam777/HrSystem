var DB = require('../models/DB');

var BaseController = require("./Base"),
	View = require("../views/Base")

module.exports = BaseController.extend({ 
	name: "hrlogin",
	run: function(req, res, next) {
		var v = new View(res, 'hrlogin');
		v.render({
		});	
	},
});
