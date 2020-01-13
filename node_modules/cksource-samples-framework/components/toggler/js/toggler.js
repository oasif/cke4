/*
 Copyright (c) 2003-2015, CKSource - Frederico Knabben. All rights reserved.
 Licensed under the terms of the MIT license. See LICENSE.md for details.
 */

'use strict';

( function() {
	// All .tree-a elements in DOM.
	var expanders = SF.getByClass( 'toggler' );

	var i = expanders.length;
	while ( i-- ) {
		var expander = expanders[ i ];

		SF.attachListener( expander, 'click', function() {
			var containsIcon = SF.classList.contains( this, 'icon-toggler-expanded' ) || SF.classList.contains( this, 'icon-toggler-collapsed' ),
				related = document.getElementById( this.getAttribute( 'data-for' ) );

			SF.classList.toggle( this, 'collapsed' );

			if ( SF.classList.contains( this, 'collapsed' ) ) {
				SF.classList.add( related, 'collapsed' );
				if ( containsIcon ) {
					SF.classList.remove( this, 'icon-toggler-expanded' );
					SF.classList.add( this, 'icon-toggler-collapsed' );
				}
			} else {
				SF.classList.remove( related, 'collapsed' );
				if ( containsIcon ) {
					SF.classList.remove( this, 'icon-toggler-collapsed' );
					SF.classList.add( this, 'icon-toggler-expanded' );
				}
			}
		} );
	}
} )();