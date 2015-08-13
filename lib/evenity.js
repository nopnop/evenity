exports.on = function (obj, eventName, handler) {
  if (obj.addEventListener) {
    obj.addEventListener(eventName, handler)
  } else if (obj.attachEvent) {
    obj.attachEvent('on' + eventName, handler)
  } else if (obj.on) {
    obj.on(eventName, handler)
  } else {
    obj['on' + eventName] = handler
  }

  return {
    close: function () {
      exports.off(obj, eventName, handler)
    }
  }
}

exports.once = function (obj, eventName, handler) {
  function wrap () {
    exports.off(obj, eventName, wrap)
    return handler.apply(this, arguments)
  }
  return exports.on(obj, eventName, wrap)
}

exports.off = function (obj, eventName, handler) {
  if (obj.removeEventListener) {
    obj.removeEventListener(eventName, handler)
  } else if (obj.detachEvent) {
    obj.detachEvent('on' + eventName, handler)
  } else if (obj.removeListener) {
    obj.removeListener(eventName, handler)
  } else if (obj.off) {
    obj.off(eventName, handler)
  } else {
    delete obj['on' + eventName]
  }
}

exports.emit = function (obj, eventName, data) {
  var event

  // If obj is an HTMLElement
  if (obj.dispatchEvent) {
    if (eventName instanceof window.Event) {
      data = eventName
    }
    if (data instanceof window.Event) {
      event = data
    } else {
      event = new window.CustomEvent(eventName, {
        detail: data
      })
    }
    return obj.dispatchEvent(event)
  }

  if (typeof eventName === 'string') {
    event = {
      detail: data,
      type: eventName,
      currentTarget: obj,
      bubbles: false,
      cancelable: false,
      cancelabled: false,
      preventDefault: function () { event.canceled = true },
      stopPropagation: function () {}
    }
  } else {
    event = eventName
    eventName = event.type
  }

  if (obj.emit) {
    obj.emit(eventName, event)
    return event.canceled
  } else if (typeof obj['on' + eventName] === 'function') {
    obj['on' + eventName](event)
    return event.canceled
  }
}
