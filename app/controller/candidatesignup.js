var DB = require('../models/DB');

var BaseController = require("./Base"),
	View = require("../views/Base")



module.exports = BaseController.extend({ 
	name: "candidatesignup",
	run: function(req, res, next) {
		var v = new View(res, 'candidatesignup');
        DB.query("SELECT * from postions", (error, results, fields) => {
    		if(error) throw error;
            else{    
                v.render({
                    postions: results,
                });	
            }
  		});	
	},
});
