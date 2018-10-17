# Shake.js

A custom 'shake' event JavaScript plugin for mobile web browsers using device accelerometer.

## Installation

* [NPM](https://www.npmjs.com/package/shake.js): `npm i -s shake.js`

## Dependencies

Your web browser must support the `devicemotion` event for this plugin to work. Shake.js uses built-in feature detection to determine if it can run in your web browser. It will terminate silently on non-supporting browsers.

* [DeviceOrientation Event Specification](https://w3c.github.io/deviceorientation/)

## Setup

### For CommonJS using NPM:

```javascript
const Shake = require('shake.js');
```

### For ES6 Import using NPM:

```javascript
import Shake from 'shake.js';
```

### In the browser using NPM:

```html
<script src="./node_modules/shake.js/dist/index.js"></script>
```

### Use
```javascript
// Create an instance
const myShakeEvent = new Shake({
    threshold: 15, // optional shake strength threshold
    timeout: 1000 // optional, determines the frequency of event generation
});

// Start listening to device motion:
myShakeEvent.start();

// Register a `shake` event listener on `window` with your callback:
window.addEventListener('shake', shakeEventDidOccur, false);

// function to call when shake event occurs
function shakeEventDidOccur () {
    // Do something awesome!
}

// You can stop listening for shake events like so:
window.removeEventListener('shake', shakeEventDidOccur, false);

// To stop listening to device motion, you can call:
myShakeEvent.stop();
```

## Supported web browsers/devices

- iOS Safari 4.2.1 (and above)
- Android 4.0.3 (default browser)
- Chrome 41+ for Android
- Opera Mobile (Android)
- BlackBerry PlayBook 2.0
- Firefox for Android
- FirefoxOS Devices
