/**
 * Copyright (c) 2014-2015, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT License (see LICENSE.md).
 */

'use strict';

var path = require( 'path' ),
	sinonPath = path.join( require.resolve( 'sinon' ), '../../pkg/sinon.js' ),
	sinonIEPath = path.join( require.resolve( 'sinon' ), '../../pkg/sinon-ie.js' ),
	prefixedSinonPath = path.join( '/plugins', sinonPath ).split( path.sep ).join( '/' ),
	prefixedSinonIEPath = path.join( '/plugins', sinonIEPath ).split( path.sep ).join( '/' );

module.exports = {
	name: 'bender-sinon',

	attach: function() {
		this.pagebuilders.add( 'sinon', build, this.pagebuilders.getPriority( 'html' ) - 1 );
		this.plugins.addFiles( [ sinonPath, sinonIEPath ] );

		function build( data ) {
			data.parts.push(
				`<head>
					<script src="${ prefixedSinonPath }"></script>
					<!-- IE8- need additional care to make timers and XHR work. -->
					<!--[if lte IE 8]>
						<script src="${ prefixedSinonIEPath }"></script>
					<![endif]-->
					<script>
						// Expose Sinon if we are in an AMD environment.
						if ( typeof define == 'function' && define.amd && typeof sinon == 'undefined' ) {
							var done = bender.defer();

							( function() {
								require( [ 'sinon' ], function( sinon ) {
									window.sinon = sinon;
									done();
								} );
							} )();
						}
					</script>
				</head>`
			);

			return data;
		}
	}
};
