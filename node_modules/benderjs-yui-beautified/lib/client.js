
( function( window, bender ) {
	'use strict';

	if ( !bender.assert ) {
		throw new Error( 'bender.assert is not defined. Make sure that bender-framework-yui plugin is loaded.' );
	}

	var objectHelpers = {
		keys: function( obj ) {
			if ( Object.keys ) {
				return Object.keys( obj );
			} else {
				var ret = [],
					i;

				// Simplified implementation, doesn't consider all the browser quirks.

				for ( i in obj ) {
					if ( obj.hasOwnProperty( i ) ) {
						ret.push( i );
					}
				}

				return ret;
			}
		},

		sortObjectProperties: function( inObject ) {
			if ( !inObject ) {
				// Garbage in, garbage out.
				return inObject;
			}

			var keys = this.keys( inObject ).sort(),
				ret = {},
				i;

			for ( i = 0; i < keys.length; i++ ) {
				ret[ keys[ i ] ] = inObject[ keys[ i ] ];
			}

			return ret;
		}
	};

	bender.assert.beautified = {
		/**
		 * Config used in `js-beautify` calls.
		 *
		 * @private
		 */
		_config: {
			indent_with_tabs: true,
			wrap_line_length: 0,
			// All tags should be reformatted.
			unformatted: 'none',
			indent_inner_html: true,
			preserve_newlines: false,
			max_preserve_newlines: 0,
			indent_handlebars: false,
			end_with_newline: true,
			extra_liners: 'head, body, div, p, /html'
		},

		/**
		 * Compares HTML code, but beautifies it before the comparison.
		 *
		 * @param {mixed} expected
		 * @param {mixed} actual
		 * @param {String/Object} optionsOrMsg Assertion message if string, otherwise an options object like following:
		 *
		 *		{
		 *			message: 'Fail message',
		 *			sortAttributes: true,
		 *			fixZWS: false
		 *		}
		 *
		 * If you don't want to format `expected` and `actual` with `compatHtml` you can set `options.skipCompatHtml` to `true`.
		 */
		html: function( expected, actual, optionsOrMsg ) {
			var options = optionsOrMsg instanceof Object ? optionsOrMsg : { message: optionsOrMsg },
				msg = options.message,
				compatHtml = bender.tools && bender.tools.compatHtml;

			if ( !options.skipCompatHtml ) {
				var sortAttributes = ( 'sortAttributes' in options ) ? options.sortAttributes : true,
					fixZWS = ( 'fixZWS' in options ) ? options.fixZWS : true,
					fixNbsp = ( 'fixNbsp' in options ) ? options.fixNbsp : true;

				if ( !compatHtml ) {
					throw new Error( 'Missing bender.tools.compatHtml' );
				}

				expected = compatHtml( expected, options.noInterWS, sortAttributes, fixZWS, options.fixStyles, fixNbsp, options.noTempElements, options.customFilters );
				actual = compatHtml( actual, options.noInterWS, sortAttributes, fixZWS, options.fixStyles, fixNbsp, options.noTempElements, options.customFilters );
			}

			bender.assert.areSame( html_beautify( expected, this._config ), html_beautify( actual, this._config ), msg );
		},

		/**
		 * Compares JavaScript code, but beautifies it before the comparison.
		 *
		 * @param {mixed} expected
		 * @param {mixed} actual
		 * @param {String} [msg] Assertion message.
		 */
		js: function( expected, actual, msg ) {
			bender.assert.areSame( js_beautify( expected, this._config ), js_beautify( actual, this._config ), msg );
		},

		/**
		 * Compares two objects.
		 *
		 * @param {mixed} expected
		 * @param {mixed} actual
		 * @param {String} [msg] Assertion message.
		 */
		object: function( expected, actual, msg ) {
			var assert = bender.assert;

			assert.isTypeOf( 'object', expected, 'Expected is not an object' );
			assert.isTypeOf( 'object', actual, 'Actual is not an object' );

			// Simply convert to JSON strings for a good diff in case of fails.
			expected = JSON.stringify( objectHelpers.sortObjectProperties( expected ) );
			actual = JSON.stringify( objectHelpers.sortObjectProperties( actual ) );

			this.js( expected, actual, msg );
		}
	};

} )( window, bender );
