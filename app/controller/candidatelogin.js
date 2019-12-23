var BaseController = require("./Base"),
	View = require("../views/Base")

module.exports = BaseController.extend({ 
	name: "candidatelogin",
	run: function(req, res, next) {
		var v = new View(res, 'candidatelogin');
		v.render({
		});		
	},
});
