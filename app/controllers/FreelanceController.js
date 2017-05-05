/**
 * Created by MaximeMaillet on 05/05/2017.
 */

"use strict";

function FreelanceController() {

	var AhttPI = require('../libs/AhttPI');

	this.get = function(req, res) {

		var proms = [];
		var isSolved = false;
		var jsonContent;

		for(var i = 0; i < 10; i++) {
			proms.push(
				new Promise(function(resolve, reject) {
					AhttPI.getContent('/'+req.params.username)
						.then(function(json) {
							isSolved = true;
							jsonContent = json;
							resolve();
						})
						.catch(resolve());
				})
			);
		}

		var rootRes = res;

		new Promise((resolve, reject) => {

			var sI = setInterval(function() {
				if(isSolved) {
					resolve(jsonContent);
					clearInterval(sI);
				}
			}, 100);

		})
			.then((json) => {
				console.log("end" +json);
				res.render('details', {
					title: json.firstname+' '+json.lastname,
					full_name: json.firstname+' '+json.lastname,
					username: json.username,
					position: json.position,
					birth_date: json.birth_date
				});
			});

		Promise.all(proms)
			.then(() => {
				console.log("End massive sending")
			})
			.catch((err) => {
			});
	}

	this.getAll = function(req, res) {

		AhttPI.getContent('/')
			.then((json) => {
				console.log(json);
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