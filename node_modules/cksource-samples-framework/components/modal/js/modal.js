/**
 * @license Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 * Licensed under the terms of the MIT license. See LICENSE.md for more information.
 */

/* global SF, picoModal */

'use strict';

( function() {
	// Purges all styles in passed object.
	function purgeStyles( styles ) {
		for ( var i in styles ) {
			delete styles[ i ];
		}
	}

	SF.modal = function( config ) {
		// Modal should use the same style set as the rest of the page (.content component).
		config.modalClass = 'modal content';
		config.closeClass = 'modal-close';

		// Purge all pre-defined pico styles. Use the lessfile instead.
		config.modalStyles = purgeStyles;

		// Close button styles are customized via lessfile.
		config.closeStyles = purgeStyles;

		var userDefinedAfterCreate = config.afterCreate,
			userDefinedAfterClose = config.afterClose;

		// Close modal on ESC key.
		function onKeyDown( event ) {
			if ( event.keyCode == 27 ) {
				modal.close();
			}
		}

		// Use afterCreate as a config option rather than function chain.
		config.afterCreate = function( modal ) {
			userDefinedAfterCreate && userDefinedAfterCreate( modal );

			window.addEventListener( 'keydown', onKeyDown );
		};

		// Use afterClose as a config option rather than function chain.
		config.afterClose = function( modal ) {
			userDefinedAfterClose && userDefinedAfterClose( modal );

			window.removeEventListener( 'keydown', onKeyDown );
		};

		var modal = new picoModal( config )
			.afterCreate( config.afterCreate )
			.afterClose( config.afterClose );

		return modal;
	};
} )();