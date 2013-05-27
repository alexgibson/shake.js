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
        this.hasDeviceOrientation = window.hasOwnProperty("orientation");

        //default velocity threshold for shake to register
        this.threshold = 15;

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
        if (this.hasDeviceMotion) { window.addEventListener('devicemotion', this, false); }
        else if (this.hasDeviceOrientation) { window.addEventListener('deviceorientation', this, false); }
    };

    //stop listening for devicemotion
    Shake.prototype.stop = function () {

        if (this.hasDeviceMotion) { window.removeEventListener('devicemotion', this, false); }
        else if (this.hasDeviceOrientation) { window.removeEventListener('deviceorientation', this, false); }
        this.reset();
    };

    Shake.prototype.deviceorientation = function(e) {
      var currentTime,
          timeDifference,
          deltaX = 0,
          deltaY = 0,
          deltaZ = 0;

      threshold = 50;

      if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
          this.lastX = e.gamma;
          this.lastY = e.beta;
          this.lastZ = e.alpha;
          return;
      }

      deltaX = Math.abs(this.lastX - e.gamma);
      deltaY = Math.abs(this.lastY - e.beta);
      deltaZ = Math.abs(this.lastZ - e.alpha);

      if (((deltaX > threshold) && (deltaY > threshold)) || ((deltaX > threshold) && (deltaZ > threshold)) || ((deltaY > threshold) && (deltaZ > threshold))) {
          //calculate time in milliseconds since last shake registered
          currentTime = new Date();
          timeDifference = currentTime.getTime() - this.lastTime.getTime();

          if (timeDifference > 1000) {
              window.dispatchEvent(this.event);
              this.lastTime = new Date();
          }
      }

      this.lastX = e.gamma;
      this.lastY = e.beta;
      this.lastZ = e.alpha;

    };

    //calculates if shake did occur
    Shake.prototype.devicemotion = function (e) {
        var current = e.accelerationIncludingGravity,
            currentTime,
            timeDifference,
            deltaX = 0,
            deltaY = 0,
            deltaZ = 0;

        if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
            return;
        }

        deltaX = Math.abs(this.lastX - current.x);
        deltaY = Math.abs(this.lastY - current.y);
        deltaZ = Math.abs(this.lastZ - current.z);

        if (((deltaX > this.threshold) && (deltaY > this.threshold)) || ((deltaX > this.threshold) && (deltaZ > this.threshold)) || ((deltaY > this.threshold) && (deltaZ > this.threshold))) {
            //calculate time in milliseconds since last shake registered
            currentTime = new Date();
            timeDifference = currentTime.getTime() - this.lastTime.getTime();

            if (timeDifference > 1000) {
                window.dispatchEvent(this.event);
                this.lastTime = new Date();
            }
        }

        this.lastX = current.x;
        this.lastY = current.y;
        this.lastZ = current.z;

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
