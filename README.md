shake.js
=======================================

A custom 'shake' event JavaScript plugin for mobile web browsers using device accelerometer.

Dependencies
---------------------------------------

Your web browser must support the `devicemotion` event for this plugin to work. Shake.js uses built-in feature detection to determine if it can run in your web browser. It will terminate silently on non-supporting browsers.

http://dev.w3.org/geo/api/spec-source-orientation

Setup
---------------------------------------

First, include the main JavaScript file in the `<head>` of your HTML document:

	<script type="text/javascript" src="shake.js" ></script>

Next, include the following script just before the end `</body>` tag in your HTML to create a new instance of the plugin. Put your own code within the `shakeEventDidOccur()` method for what you want to happen when a shake event occurs.

	<script type="text/javascript"> 
	window.onload = function() {

		//create a new instance of shake.js
		var myShakeEvent = new Shake();

		//start listening for shake event 
		//you can also use stop() to stop listening
		myShakeEvent.start();
	
		//define a custom method to fire when shake occurs
		myShakeEvent.shakeEventDidOccur = function() {
	
			//put your own code here etc
			if (confirm("Undo?")) {

			}
		}
	};
	</script>

Threshold parameter (optional)
---------------------------------------

You can pass a custom `threshold` parameter to shake.js, to control the velocity of shake a user must perform in order to control when a shake event will register. The default value is `15`, which is suited to a small, mobile device such as an iPhone. You may choose to lower the threshold value for larger devices, such as the iPad for example.
	
	var threshold = 15; //user defined velocity

	var myShakeEvent = new Shake(threshold);
	
Supported browsers/devices
---------------------------------------

- Mobile Safari, iOS 4.2.1 (and above)
	
License
---------------------------------------

Copyright (c) 2009-2011 Alex Gibson

http://miniapps.co.uk/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction except as noted below, including without limitation the rights to use, copy, modify, merge, publish, distribute, and/or sublicense, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE