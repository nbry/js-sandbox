'use strict';

const {createHmac}=require('crypto');


function handler(){
	const secret = 'abcdefg';
	const hash = createHmac('sha256', secret)
		.update('I love cupcakes')
		.digest('hex');
	console.log(hash);
}

module.exports = handler;
