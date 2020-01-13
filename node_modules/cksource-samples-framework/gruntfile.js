/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT license. See LICENSE.md for more information.
 */

'use strict';

module.exports = function( grunt ) {
	var cssBanner = [
		'/**',
		' * @license Copyright (c) 2003-' + new Date().getFullYear() + ', CKSource - Frederico Knabben. All rights reserved.',
		' * Licensed under the terms of the MIT license. See LICENSE.md for more information.',
		' */'
	].join( '\n' );

	require( 'load-grunt-tasks' )( grunt );

	grunt.registerTask( 'default', [ 'less' ] );

	grunt.initConfig( {
		less: {
			dev: {
				expand: true,
				cwd: 'samples/',
				src: '**/*.less',
				dest: 'samples/',
				ext: '.css',
				flatten: false,
				rename: function( src, dest ) {
					return src + dest.replace( '/less/', '/css/' );
				},

				options: {
					ieCompat: true,
					paths: [ 'samples/' ],
					relativeUrls: true,

					banner: cssBanner,
					sourceMap: true,
					sourceMapFileInline: true,
					sourceMapRootpath: '../../../'
				}
			},

			docs: {
				files: {
					'docs/css/docs.css': 'docs/less/docs.less'
				},

				options: {
					ieCompat: true,
					paths: [ 'docs/' ],
					relativeUrls: true,

					banner: cssBanner,
					sourceMap: true,
					sourceMapFileInline: true,
					sourceMapRootpath: '../../'
				}
			}
		},

		watch: {
			less: {
				files: '<%= less.dev.src %>',
				tasks: [ 'less' ],
				options: {
					nospawn: true
				}
			}
		}
	} );
};
