shake.js
=======================================

A custom 'shake' event JavaScript plugin for mobile web browsers using device accelerometer.

Installation
---------------------------------------

* Download: [zip](https://github.com/alexgibson/shake.js/zipball/master)
* [NPM](https://www.npmjs.org/): `npm install shake.js`
* [Bower](https://github.com/twitter/bower/): `bower install shake.js`
* Git: `git clone https://github.com/alexgibson/shake.js`

Dependencies
---------------------------------------

Your web browser must support the `devicemotion` event for this plugin to work. Shake.js uses built-in feature detection to determine if it can run in your web browser. It will terminate silently on non-supporting browsers.

http://w3c.github.io/deviceorientation/spec-source-orientation.html

Setup
---------------------------------------

For CommonJS using NPM:

```
var Shake = require('shake.js');
```

For AMD module:

```
define(['./shake'], function(Shake) {
    // ...
});
```

In the browser:

```
<script src="shake.js"></script>
```

Now, create your custom code

```html
<script>
function myStuffWhenItShakes() {
    // custom code here, for example
    console.log("I'm shaken to the core"!);
}
</script>
```

Next, create a new Shake instance:

```javascript
var myShakeEvent = new Shake({
    threshold: 15, // optional shake strength threshold
    timeout: 1000, // optional, determines the frequency of event generation
    callback: myStuffWhenItShakes   // optional but important, without it, shakes will only cause console-log entries
});
```

Start listening to device motion:

```
myShakeEvent.start();
```

To stop listening to device motion, you can call:

```
myShakeEvent.stop();
```

Breaking Changes in Version 2
---------------------------------------
Version 1 used a window-event mechanism, which was replaced by a callback in V2. So any V1 code will fail, but it's easy and quick to adjust to V2.

Supported web browsers/devices
---------------------------------------

- iOS Safari 4.2.1 (and above)
- Android 4.0.3 (default browser)
- Chrome 41+ for Android
- Opera Mobile (Android)
- BlackBerry PlayBook 2.0
- Firefox for Android
- FirefoxOS Devices


Chrome Warning
---------------------------------------
At the moment, the desktop-chrome browser will generate a warning that shake-detection should be used on https-sites and will be deprecated on non-secure sites some time in the future. We recommend that you take notice and try to move to https. 