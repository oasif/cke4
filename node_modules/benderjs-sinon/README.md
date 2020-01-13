# benderjs-sinon

[Sinon.js](http://sinonjs.org/) adapter for Bender.js

## Installation

```
npm install benderjs-sinon
```

## Usage

Add `benderjs-sinon` to the `plugins` array in your `bender.js` configuration file:

```javascript
var config = {
    applications: {...}

    browsers: [...],

    plugins: ['benderjs-sinon'], // load the plugin

    tests: {...}
};

module.exports = config;
```

From now on Sinon.js API will be available in the global namespace of a test page.
For more details please check Sinon.js' [documentation](http://sinonjs.org/docs/).

## License

MIT, for license details see: [LICENSE.md](https://github.com/benderjs/benderjs-sinon/blob/master/LICENSE.md).
