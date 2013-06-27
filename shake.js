/*
 *
 * Find more about this plugin by visiting
 * http://alxgbsn.co.uk/
 *
 * Copyright (c) 2010-2012 Alex Gibson
 * Released under MIT license
 *
 */

(function (window, document) {

    function Shake() {

        //feature detect
        this.hasDeviceMotion = 'ondevicemotion' in window;
        this.hasDeviceOrientation = 'orientation' in window;

        //default velocity threshold for shake to register
        this.motionThreshold = 15;
        this.orientationThreshold = 50;

        //use date to prevent multiple shakes firing
        this.lastTime = new Date();

        //accelerometer values
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;

        //create custom event
        if (typeof CustomEvent === "function") {
            this.event = new CustomEvent('shake', {
                bubbles: true,
                cancelable: true
            });
        } else if (typeof document.createEvent === "function") {
            this.event = document.createEvent('Event');
            this.event.initEvent('shake', true, true);
        } else { 
          return false;
        }
    }

    //reset timer values
    Shake.prototype.reset = function () {
        this.lastTime = new Date();
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
    };

    //start listening for devicemotion
    Shake.prototype.start = function () {
        this.reset();
        if (this.hasDeviceOrientation) {
            window.addEventListener('deviceorientation', this, false);
        } else if (this.hasDeviceMotion) { 
            window.addEventListener('devicemotion', this, false); 
        }
    };

    //stop listening for devicemotion
    Shake.prototype.stop = function () {
        if (this.hasDeviceOrientation) {
            window.removeEventListener('deviceorientation', this, false); 
        } else if (this.hasDeviceMotion) { 
            window.removeEventListener('devicemotion', this, false); 
        } 
        this.reset();
    };

    //calculates if shake did occur
    Shake.prototype.devicemotion = function (e) {
        var current = e.accelerationIncludingGravity;
        this.checkShake(this.motionThreshold, current.x, current.y, current.z);
    };

    Shake.prototype.deviceorientation = function(e) {
        this.checkShake(this.orientationThreshold, e.gamma, e.beta, e.alpha);
    };

    Shake.prototype.checkShake = function(threshold, x, y, z) {
        var currentTime,
            timeDifference,
            deltaX = 0,
            deltaY = 0,
            deltaZ = 0;

        if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
            this.lastX = x;
            this.lastY = y;
            this.lastZ = z;
            return;
        }

        deltaX = Math.abs(this.lastX - x);
        deltaY = Math.abs(this.lastY - y);
        deltaZ = Math.abs(this.lastZ - z);

        if (((deltaX > threshold) && (deltaY > threshold)) || ((deltaX > threshold) && (deltaZ > threshold)) || ((deltaY > threshold) && (deltaZ > threshold))) {
            //calculate time in milliseconds since last shake registered
            currentTime = new Date();
            timeDifference = currentTime.getTime() - this.lastTime.getTime();

            if (timeDifference > 1000) {
                window.dispatchEvent(this.event);
                this.lastTime = new Date();
            }
        }

        this.lastX = x;
        this.lastY = y;
        this.lastZ = z;
    };

    //event handler
    Shake.prototype.handleEvent = function (e) {

        if (typeof (this[e.type]) === 'function') {
            return this[e.type](e);
        }
    };

    //create a new instance of shake.js.
    var myShakeEvent = new Shake();
    myShakeEvent && myShakeEvent.start();

}(window, document));
