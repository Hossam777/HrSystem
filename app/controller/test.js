var BaseController = require("./Base"),
	View = require("../views/Base")

module.exports = BaseController.extend({ 
	name: "test",
	run: function(req, res, next) {
		var v = new View(res, 'test');
		v.render({
			text: 'Please login'
		});		
	},
});