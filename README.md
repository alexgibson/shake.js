shake.js
=======================================

A custom 'shake' event JavaScript plugin for mobile web browsers using device accelerometer.

Installation
---------------------------------------

* Download: [zip](https://github.com/alexgibson/shake.js/zipball/master)
* [Bower](https://github.com/twitter/bower/): `bower install shake.js`
* Git: `git clone https://github.com/alexgibson/shake.js`

Dependencies
---------------------------------------

Your web browser must support the `devicemotion` event for this plugin to work. Shake.js uses built-in feature detection to determine if it can run in your web browser. It will terminate silently on non-supporting browsers.

http://w3c.github.io/deviceorientation/spec-source-orientation.html

Setup
---------------------------------------

First, include the main JavaScript file in the `<head>` of your HTML document:

```
<script src="shake.js"></script>
```

Next, create a new Shake instance and listen for the custom 'shake' event:

```
//create a new instance of shake.js.
var myShakeEvent = new Shake({
    threshold: 15 // optional shake strength threshold
});

// start listening to device motion
myShakeEvent.start();

window.addEventListener('shake', shakeEventDidOccur, false);

//function to call when shake occurs
function shakeEventDidOccur () {

	//put your own code here etc.
	if (confirm("Undo?")) {

	}
}
```

You can stop listening for shake events like so:

```
window.removeEventListener('shake', shakeEventDidOccur, false);
```

To stop listening to device motion, you can call:

```
myShakeEvent.stop();
```

You also can use it as an AMD module:

```
define(['./shake'], function(Shake) {
     var myShakeEvent = new Shake();
    // ...
});
```

Or as a CommonJS module:

```
var Shake = require('./shake');
var myShakeEvent = new Shake();
// ...
```
  

Supported web browsers/devices
---------------------------------------

- iOS Safari 4.2.1 (and above)
- Android 4.0.3 (default browser)
- Opera Mobile (Android)
- BlackBerry PlayBook 2.0
- Firefox for Android
- FirefoxOS Devices
