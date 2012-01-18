/*
 * 
 * Find more about this plugin by visiting
 * http://miniapps.co.uk/
 *
 * Copyright (c) 2010-2012 Alex Gibson, http://miniapps.co.uk/
 * Released under MIT license 
 * http://miniapps.co.uk/license/
 * 
 */
 
(function() {

	function Shake() {

		//default velocity threshold for shake to register
		this.threshold = 15;
		
		//use date to prevent multiple shakes firing			
		this.lastTime = new Date();	
		
		//accelerometer values
		this.lastX = null;
		this.lastY = null;
		this.lastZ = null;	
		
		//create custom event
		this.event = document.createEvent('Event');
		this.event.initEvent('shake', true, true);
	}
	
	//reset timer values
	Shake.prototype.reset = function() {
	
		this.lastTime = new Date();
		this.lastX = null;
		this.lastY = null;
		this.lastZ = null;
	};

	//start listening for devicemotion
	Shake.prototype.start = function() {

		this.reset();
		if ('ondevicemotion' in window) { window.addEventListener('devicemotion', this, false); }
	};

	//stop listening for devicemotion
	Shake.prototype.stop = function() {

		if ('ondevicemotion' in window) { window.removeEventListener('devicemotion', this, false); }
		this.reset();
	};

	//calculates if shake did occur
	Shake.prototype.devicemotion = function(e) {
	
		var current = e.accelerationIncludingGravity;
	
		if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
		
			this.lastX = current.x;
			this.lastY = current.y;
			this.lastZ = current.z;	
			return;
		}

		var deltaX = Math.abs(this.lastX - current.x),
			deltaY = Math.abs(this.lastY - current.y),
			deltaZ = Math.abs(this.lastZ - current.z);	
		
		if(((deltaX > this.threshold) && (deltaY > this.threshold)) || 
		   ((deltaX > this.threshold) && (deltaZ > this.threshold)) || 
		   ((deltaY > this.threshold) && (deltaZ > this.threshold))) {
		
			//calculate time in milliseconds since last shake registered
			var currentTime = new Date(),
				timeDifference = currentTime.getTime() - this.lastTime.getTime();
			
			if (timeDifference > 1000) {
				window.dispatchEvent(this.event);
				this.lastTime = new Date();
			}
		}
	};

	//event handler
	Shake.prototype.handleEvent = function(e) {

		if (typeof(this[e.type]) === 'function' ) {
			return this[e.type](e);
		}
	};
	
	//create a new instance of shake.js.
	var myShakeEvent = new Shake();
	myShakeEvent.start();
	
})();