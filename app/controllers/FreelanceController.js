/**
 * Created by MaximeMaillet on 05/05/2017.
 */

"use strict";

function FreelanceController() {

	var AhttPI = require('../libs/AhttPI');
	var cache = require('../libs/Cache');

	function renderFreelance(freelance) {
		return {
			title: freelance.firstname+' '+freelance.lastname,
			full_name: freelance.firstname+' '+freelance.lastname,
			username: freelance.username,
			position: freelance.position,
			birth_date: freelance.birth_date
		}
	}

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

		new Promise((resolve, reject) => {

			setTimeout(function() {
				if(!isSolved) {
					reject();
				}
			}, 5000);

			var sI = setInterval(function() {
				if(isSolved) {
					clearInterval(sI);
					resolve(jsonContent);
				}
			}, 100);

		})
			.then((json) => {
				/*
				if(!cache.isExists(req.params.username)) {
					cache.addUsername(json);
				}*/
				res.render('details', renderFreelance(json));
			})
			.catch(() => {
				if(cache.isExists(req.params.username)) {
					var free = cache.get(req.params.username);
					res.render('details', renderFreelance(free));
				}
				else {
					res.status(500);
				}
			});

		Promise.all(proms)
			.then(() =>console.log("End massive sending"));
	};

	this.getAll = function(req, res) {

		AhttPI.getContent('/')
			.then((json) => {

				console.log(json);
				var jsonObject = JSON.parse(json);
				for(var i in jsonObject) {
					var free = jsonObject[i];
					if(!cache.isExists(free.username)) {
						cache.addUsername(free);
					}
				}

				res.render('index', {
					title: 'Liste des freelance',
					list: free
				});

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