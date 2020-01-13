/* jshint browser: false, node: true */

'use strict';

var config = {
	applications: {},

	framework: 'yui',

	plugins: [
		'benderjs-yui',
		'lib'
	],

	tests: {
		Plugin: {
			applications: [],
			basePath: '.',
			paths: [
				'tests/**',
				'!**/_*/**'
			]
		}
	}
};

module.exports = config;