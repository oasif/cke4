
var assert = bender.assert;

bender.test( {
	'test beautified.html is exposed': function() {
		assert.isFunction( assert.beautified.html );
	},

	'test beautified.html does exact match': function() {
		assert.beautified.html( '<span>foo</span>', '<span>foo</span>', { skipCompatHtml: true } );
	},

	'test beautified.html normalizes spaces': function() {
		assert.beautified.html( '<span>foo bar</span>', '<span>foo     bar</span>', { skipCompatHtml: true } );
	},

	'test beautified.html normalizes new lines': function() {
		assert.beautified.html(
			'<span>foo</span><span>bar</span>',
			'<span>foo</span>\n\n\n\n<span>bar</span>',
			{ skipCompatHtml: true }
		);
	}
} );