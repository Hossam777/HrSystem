var DB = require('../models/DB');
var BaseController = require("./Base"),
	View = require("../views/Base")

module.exports = BaseController.extend({ 
	name: "test",
	run: function(req, res, next) {
		var v = new View(res, 'test');
		DB.query('SELECT * from answer', (error, results, fields) => {
    		console.log('testing good');
			console.log(req.session.candidate_name);
  		});
		v.render({
			text: 'Please login'
		});		
	},
});
