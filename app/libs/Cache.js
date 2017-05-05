/**
 * Created by MaximeMaillet on 05/05/2017.
 */
function Cache() {
	"use strict";

	var cache_file = 'app/cache/freelances.json';
	var fs = require('fs');

	function createCache(callback) {
		fs.open(cache_file,'r',function(err, fd){
			if (err) {
				fs.writeFile(cache_file, '{"list": []}', function(err) {
					if(err) {
						console.log(err);
					}
					console.log("Cache file was saved!");
					callback();
				});
			}
		});
	}

	this.addUsername = function(freelance) {
		if (!fs.existsSync(cache_file)) {
			createCache(done);
		}
		else {
			done();
		}

		function done() {
			var cacheFile = require(__dirname+"/../../"+cache_file);
			cacheFile.list.push(freelance.username, freelance);
			fs.writeFile(cache_file, JSON.stringify(cacheFile), function(err) {
				if(err) {
					console.log(err);
				}
			});
		}
	}

	this.isExists = function(username) {
		if (fs.existsSync(cache_file)) {
			var cacheFile = require(__dirname+"/../../"+cache_file);
			for(var i in cacheFile.list) {
				if(cacheFile.list[i] == username) {
					return true;
				}
			}
		}
		else {
			return false;
		}
	}

	this.get = function(username) {
		if (fs.existsSync(cache_file)) {
			var cacheFile = require(__dirname+"/../../"+cache_file);
			for(var i in cacheFile.list) {
				if(cacheFile.list[i] == username) {
					return cacheFile.list.username;
				}
			}
		}
		else {
			return null;
		}
	}

}

module.exports = new Cache();