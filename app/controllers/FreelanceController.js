/**
 * Created by MaximeMaillet on 05/05/2017.
 */

"use strict";

function FreelanceController() {

	var AhttPI = require('../libs/AhttPI');
	var cache = require('../libs/Cache');

	this.get = function(req, res) {
		var username = req.params.username;

		AhttPI.getContent('/'+username)
			.then((json) => {
				if(!cache.isExists(json)) {
					cache.addUsername(json);
					res.status(200).send(json);
				}
			})
			.catch((err) => {
				// Return cache data
				if(cache.isExists(username)) {
					return res.status(200).send(cache.get(username));
				}
				else {
					return res.status(404);
				}
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