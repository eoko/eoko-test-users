/**
 * Created by MaximeMaillet on 05/05/2017.
 */

"use strict";

function FreelanceController() {

	var AhttPI = require('../libs/AhttPI');

	this.get = function(req, res) {

		AhttPI.getContent('/'+req.params.username)
			.then((json) => {
				// HTML
			})
			.catch((err) => {
				// Return cache data
			});
	}

	this.getAll = function(req, res) {
		
		AhttPI.getContent('/')
			.then((json) => {
				var jsonObject = JSON.parse(json);
				for(var i in jsonObject) {
					// Save
				}
			})
			.catch((err) => {
				console.error(err);
				res.status(500).send({
					"debug": err
				});
			});
	}
};

module.exports = new FreelanceController();