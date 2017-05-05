/**
 * Created by MaximeMaillet on 05/05/2017.
 */
"use strict";

function AhttPI() {
	this.getContent = function(endpoint, callback) {

		// return new pending promise
		return new Promise((resolve, reject) => {

			// Format URL
			var url = CONFIG.url_endpoint + endpoint;
			
			// select http or https module, depending on reqested url
			var lib = url.startsWith('https') ? require('https') : require('http');

			var request = lib.get(url, (response) => {

				// handle http errors
				if (response.statusCode < 200 || response.statusCode > 299) {
					reject(new Error('Failed to load page, status code: ' + response.statusCode));
				}

				// temporary data holder
				var body = [];

				// on every content chunk, push it to the data array
				response.on('data', (chunk) => body.push(chunk));

				// we are done, resolve promise with those joined chunks
				response.on('end', () => resolve(body.join('')));
			});

			// handle connection errors of the request
			request.on('error', (err) => reject(err))
		})
	};
}

module.exports = new AhttPI();