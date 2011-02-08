/*
 * 
 * Find more about this plugin by visiting
 * http://miniapps.co.uk/
 *
 * Copyright (c) 2010 Alex Gibson, http://miniapps.co.uk/
 * Released under MIT license 
 * http://miniapps.co.uk/license/
 * 
 */
 
(function() {

	function WKShake(threshold) {

		//default velocity threshold for shake to register
		this.threshold = 20;
		
		//use date to prevent multiple shakes firing			
		this.lastTime = new Date();		
	
		//user defined threshold option
		if (typeof threshold == 'object') {
			this.threshold = threshold;
		}
	}

	//start listening for devicemotion
	WKShake.prototype.start = function() {

		this.lastTime = new Date();
		this.lastX = null;
		this.lastY = null;
		this.lastZ = null;
	
		if (('ondevicemotion' in window)) {
			window.addEventListener('devicemotion', this, false);
		}
	};

	//stop listening for devicemotion
	WKShake.prototype.stop = function() {

		if (('ondevicemotion' in window)) {
			window.removeEventListener('devicemotion', this, false);
		}
	
		this.lastTime = new Date();
		this.lastX = null;
		this.lastY = null;
		this.lastZ = null;
	};

	//calculates if shake did occur
	WKShake.prototype.devicemotion = function(e) {

		var current = e.accelerationIncludingGravity;

		if((this.lastX !== null) || (this.lastY !== null) || (this.lastZ !== null)) {

			var deltaX = Math.abs(this.lastX - current.x),
				deltaY = Math.abs(this.lastY - current.y),
				deltaZ = Math.abs(this.lastZ - current.z);	
		
			if(((deltaX > this.threshold) && (deltaY > this.threshold)) || 
		   	((deltaX > this.threshold) && (deltaZ > this.threshold)) || 
		   	((deltaY > this.threshold) && (deltaZ > this.threshold))) {
		
				//calculate time in milliseconds since last shake registered
				var currentTime = new Date(),
					timeDifference = currentTime.getTime() - this.lastTime.getTime();
			
				if (timeDifference > 300) {
					this.shakeEventDidOccur();	
					this.lastTime = new Date();		
				}
			}
		}
	
		this.lastX = current.x;
		this.lastY = current.y;
		this.lastZ = current.z;	
	};

	//callback method will be implemented by user
	WKShake.prototype.shakeEventDidOccur = function() {

	};

	//event handler
	WKShake.prototype.handleEvent = function(e) {

		if (typeof(this[e.type]) === 'function' ) {
			return this[e.type](e);
		}
	};

	//public function
	window.WKShake = WKShake;
	
})();