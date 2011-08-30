WKShake
=======================================

Note: this plugin relies on having access to device accelerometer via DeviceMotion API:

http://dev.w3.org/geo/api/spec-source-orientation

Usage
---------------------------------------

First, include the main JavaScript file in the &lt;head&gt; of your HTML document:

	<script type="text/javascript" src="WKShake.js" ></script>

Next, include the following script just before the end &lt;/body&gt; tag in your HTML to create a new instance of the plugin. Put your own code within the shakeEventDidOccur() method for what you want to happen when a shake event occurs.

	<script type="text/javascript"> 
	window.onload = function() {

		//create a new instance of WKShake.
		var myShakeEvent = new WKShake();

		//start listening for shake event. 
		//you can also use stop() to stop listening.
		myShakeEvent.start();
	
		//define a custom method to fire when shake occurs.
		myShakeEvent.shakeEventDidOccur = function() {
	
			//put your own code here etc.
			if (confirm("Undo?")) {

			}
		}
	};
	</script>