'use strict';

/**
 * Create a promise that will resolve or reject after a timeout
 *
 * @param {number} timeout in ms
 * @param {boolean} fail - resolve or reject?
 * @returns
 */
function promisePending(timeout, fail = false) {
	const container = {};

	container.promise = new Promise((resolve, reject) => {
		container.resolve = resolve;
		container.reject = reject;
	});

	const callback = fail
		? () => {container.reject(new Error('goodbye forever!'));     }
		: () => {
			container.resolve('hello there!');
		};

	setTimeout(callback, timeout);

	return container.promise;
}

async function handler() {
	try {
		const REJECTED = promisePending(2000, true);
		const RESOLVED = promisePending(3000);

		const result = await Promise.race([REJECTED, RESOLVED]);
		console.log('success: ', result);

	} catch (err) {
		console.log('failure: ', err.message);
	}
}

module.exports = handler;
