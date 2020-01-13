
var assert = bender.assert;

bender.test( {
	'test beautified.object is exposed': function() {
		assert.isFunction( assert.beautified.object );
	},

	'test beautified.object does exact match': function() {
		var obj = { 'aaa': 1, 'bbb': 2 };
		assert.beautified.object( obj, obj );
	},

	'test beautified.object key order doesnt matter': function() {
		var a = { 'aa': 1, 'bb': 2 },
			b = { 'bb': 2, 'aa': 1 };

		assert.beautified.object( a, b );
	},

	'test beautified.object wrong type': function() {
		var a = 'asd',
			b = { 'bb': 2, 'aa': 1 };


		bender.assert.throwsError( 'Expected is not an object', function() {
			assert.beautified.object( a, b );
		} );
	},

	'test beautified.object throws for different objects': function() {
		var a = {},
			b = { 'bb': 2, 'aa': 1 };


		bender.assert.throwsError( 'Values should be the same.', function() {
			assert.beautified.object( a, b );
		} );
	},
} );