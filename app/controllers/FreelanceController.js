/**
 * Created by MaximeMaillet on 05/05/2017.
 */

"use strict";

function FreelanceController() {

	var AhttPI = require('../libs/AhttPI');

	this.get = function(req, res) {

		AhttPI.getContent('/'+req.params.username)
			.then((html) => console.log(html))
			.catch((err) => {
					console.error(err);
					res.status(500).send({
						"debug": err
					});
				}
			);
	}

	this.getAll = function(req, res) {
		AhttPI.getContent('/')
			.then((html) => console.log(html))
			.catch((err) => {
				console.error(err);
				res.status(500).send({
					"debug": err
				});
			});
	}
};

module.exports = new FreelanceController();