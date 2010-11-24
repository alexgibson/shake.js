/*
 * 
 * Find more about this plugin by visiting
 * http://miniapps.co.uk/
 *
 * Copyright (c) 2010 Alex Gibson, http://miniapps.co.uk/
 * Released under MIT license 
 * http://miniapps.co.uk/license/
 * 
 * Version 0.1 - Last updated: November 23 2010
 * 
 */

function WKShake(threshold) {

	this.threshold = 18, //velocity threshold for shake to register
	this.lastTime = new Date(); //since no event timestamp property is available, must use date to prevent multiple shakes firing
	
	//user defined threshold option
	if (typeof threshold == 'object') {
		this.threshold = threshold;
	}
}

//event handler
WKShake.prototype.handleEvent = function(e) {
    switch (e.type) {
        case 'devicemotion': this.onDeviceMotion(e); break;
    }
};

//start listening for devicemotion
WKShake.prototype.start = function() {
	this.shakeOnce = false,
	this.lastX = null,
	this.lastY = null,
	this.lastZ = null;
	window.addEventListener('devicemotion', this, false);
};

//stop listening for devicemotion
WKShake.prototype.stop = function() {
	window.removeEventListener('devicemotion', this, false);
	this.shakeOnce = false,
	this.lastX = null,
	this.lastY = null,
	this.lastZ = null;
};

//calculates if shake did occur
WKShake.prototype.onDeviceMotion = function(e) {

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
			
			if (timeDifference > 200) {
				this.shakeEventDidOccur();	
				this.lastTime = new Date();		
			}
		}
	}
	this.lastX = current.x;
	this.lastY = current.y;
	this.lastZ = current.z;	
};

//custom method for when shake event occurs
WKShake.prototype.shakeEventDidOccur = function() {


};