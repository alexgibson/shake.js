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

http://dev.w3.org/geo/api/spec-source-orientation

Setup
---------------------------------------

First, include the main JavaScript file in the `<head>` of your HTML document:

```
<script src="shake.js"></script>
```

Next, listen for the custom 'shake' event:

```
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

Supported web browsers/devices
---------------------------------------

- iOS Safari 4.2.1 (and above)
- Android 4.0.3 (default browser)
- Opera Mobile (Android)
- BlackBerry PlayBook 2.0
- Firefox for Android
- FirefoxOS Devices
