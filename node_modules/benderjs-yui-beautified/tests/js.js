
var assert = bender.assert;

bender.test( {
	'test beautified.js is exposed': function() {
		assert.isFunction( assert.beautified.js );
	},

	'test beautified.js does exact match': function() {
		var code = 'var foo = 1,\nbar = 3';

		assert.beautified.js( code, code );
	},

	'test beautified.js normalizes spaces': function() {
		assert.beautified.js( 'var foo        = 2;', 'var foo = 2;' );
	},

	'test beautified.js normalizes new lines': function() {
		assert.beautified.js( 'foo( 1 );\nbar( 2 );', 'foo( 1 );\n\n\n\nbar( 2 );' );
	}
} );