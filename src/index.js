class Shake {
  constructor (options) {
    const { threshold, timeout } = options
    if (options) {
      this.options = {
        threshold,
        timeout
      }
    }

    this.hasDeviceMotion = 'ondevicemotion' in window
    this.lastTime = null
    this.lastX = null
    this.lastY = null
    this.lastZ = null
    this.options = {
      threshold: 1,
      timeout: 1000
    }

    if (typeof CustomEvent === 'function') {
      this.event = new CustomEvent('shake', {
        bubbles: true,
        cancelable: true
      })
    } else {
      this.event = document.createEvent('Event')
      this.event.initEvent('shake', true, true)
    }
    this.handleDeviceMotion = this.handleDeviceMotion.bind(this)
  }

  reset () {
    this.lastTime = new Date()
    this.lastX = null
    this.lastY = null
    this.lastZ = null
  }

  start () {
    this.reset()
    if (this.hasDeviceMotion) {
      window.addEventListener('devicemotion', this.handleDeviceMotion, false)
    }
  }

  stop () {
    if (this.hasDeviceMotion) {
      window.removeEventListener('devicemotion', this.handleDeviceMotion, false)
    }
    this.reset()
  }

  handleDeviceMotion (e) {
    let current = e.accelerationIncludingGravity
    let currentTime
    let timeDifference
    let deltaX = 0
    let deltaY = 0
    let deltaZ = 0

    if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
      this.lastX = current.x
      this.lastY = current.y
      this.lastZ = current.z
      return
    }

    deltaX = Math.abs(this.lastX - current.x)
    deltaY = Math.abs(this.lastY - current.y)
    deltaZ = Math.abs(this.lastZ - current.z)

    if (((deltaX > this.options.threshold) && (deltaY > this.options.threshold)) || ((deltaX > this.options.threshold) && (deltaZ > this.options.threshold)) || ((deltaY > this.options.threshold) && (deltaZ > this.options.threshold))) {
      currentTime = new Date()
      timeDifference = currentTime.getTime() - this.lastTime.getTime()

      if (timeDifference > this.options.timeout) {
        this.event.acceleration = { deltaX, deltaY, deltaZ }
        window.dispatchEvent(this.event)
        this.lastTime = new Date()
      }
    }

    this.lastX = current.x
    this.lastY = current.y
    this.lastZ = current.z
  }
}

export default Shake
