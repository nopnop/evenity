# evenity
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

[travis-image]: https://img.shields.io/travis/nopnop/evenity.svg?style=flat&branch=master
[travis-url]: https://travis-ci.org/nopnop/evenity
[npm-image]: https://img.shields.io/npm/v/evenity.svg?style=flat
[npm-url]: https://npmjs.org/package/evenity
[downloads-image]: https://img.shields.io/npm/dm/evenity.svg?style=flat
[downloads-url]: https://npmjs.org/package/evenity

Unified event attachment utility

## Features

  - Attach event to any kind of event-enabled object
  - Same event API for both node-like event emitter instance and html element
  - Return a closable object to detach event

## Getting Started
Install the module with: `npm install --save nova-evenity`

```javascript
var evenity = require('nova-evenity')
var EventEmitter = require('events').EventEmitter

var el = document.createElement('div')
var obj = new EventEmitter()

function handler(event) {
  // ...
  // event.detail contain the emitted datas
}

// Attach event on any eventemitter-kind object
var eventOnElement = evenity.on(el, 'myevent', handler)
var eventOnObject = evenity.on(obj, 'myevent', handler)

// Attach event once
evenity.once( /* ... */ )

// Detach event
evenity.off(el, 'myevent', handler)
evenity.off(obj, 'myevent', handler)

// Emit event
evenity.emit(el, 'click', {foo:'bar'})
//  {foo:'bar'} is the detail of the CustomEvent for HTMLElement

// Detach event using close method returned by evenity
eventOnElement.close()
eventOnObject.close()

```

## API

### evenity.on()
`evenity.on({EventEmitter|HTMLElement} obj, {String} eventname, {Function} handler) => {Object} closable`

Attach an event handler to an object. If `obj` is an `HTMLElement` the `handler` will receive an event object. Else, `handler` receive the emitted data.

The returned `closable` object has a `closable.close()` method to detach the handler:

```javascript
var e = evenity.on(obj, 'eventname', function(event) { /* handle event.detail */ } )
e.close() // Detach event handler
```

### evenity.once()
`evenity.once({EventEmitter|HTMLElement} obj, {String} eventname, {Function} handler)`

Same as `evenity.on()` but the handler is called only once, then the event is automatically
detached

### evenity.off()
`evenity.off({EventEmitter|HTMLElement} obj, {String} eventname, {Function} handler)`

Detach an event handler

### evenity.emit()
`evenity.emit({EventEmitter|HTMLElement} obj, {String|CustomEvent} eventnameOrCustomEvent, [{mixed|Event} data])`

Emit an event. If `obj` is an HTMLElement, then a `CustomEvent` is emitted with data as detail. If data is a `window.Event instance` then

```javascript
evenity.emit(el, 'myEvent', { foo: 'bar' })
evenity.emit(el, new CustomEvent('myEvent', { detail: {}, bubbles: true, cancelable: true }))
var canceled = !evenity.emit(el, new MouseEvent('click', { view: window, bubbles: true, cancelable: true }))
```

---

[The MIT License](./LICENSE)


[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
