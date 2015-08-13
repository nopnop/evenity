/* global describe it beforeEach */

var evenity = require('../lib/evenity')
var expect = require('expect.js')
var EventEmitter = require('events').EventEmitter

describe('evenity', function () {
  var data
  var calls
  var handler

  beforeEach(function () {
    data = {foo: 'bar'}
    calls = []
    handler = function (event) { calls.push(event.detail) }
  })

  describe('#on()', function () {
    it('should attach an event handler to an event emitter (node\'s style)', function () {
      var obj = new EventEmitter()
      evenity.on(obj, 'eventname', handler)
      evenity.emit(obj, 'eventname', data)
      expect(calls.length).to.eql(1)
      expect(calls[0]).to.equal(data)
    })

    it('should attach an event handler to an html element', function () {
      var obj = document.createElement('div')
      evenity.on(obj, 'eventname', handler)
      evenity.emit(obj, 'eventname', data)
      expect(calls.length).to.eql(1)
      expect(calls[0]).to.equal(data)
    })

    it('should return a closable object to remove handler', function () {
      var obj = new EventEmitter()
      var ev = evenity.on(obj, 'eventname', handler)
      evenity.emit(obj, 'eventname', data)
      ev.close()
      evenity.emit(obj, 'eventname', data) // Should be ignored
      expect(calls.length).to.eql(1)
      expect(calls[0]).to.equal(data)
    })
  })

  describe('#once()', function () {
    it('should attach an event handler only once', function () {
      var obj = new EventEmitter()
      evenity.once(obj, 'eventname', handler)
      evenity.emit(obj, 'eventname', data)
      evenity.emit(obj, 'eventname', data) // Should be ignored
      expect(calls.length).to.eql(1)
      expect(calls[0]).to.equal(data)
    })
  })

  describe('#off()', function () {
    it('should detach an event handler (node\'s style)', function () {
      var obj = new EventEmitter()
      evenity.on(obj, 'eventname', handler)
      evenity.emit(obj, 'eventname', data)
      evenity.off(obj, 'eventname', handler)
      evenity.emit(obj, 'eventname', data)  // Should be ignored
      expect(calls.length).to.eql(1)
      expect(calls[0]).to.equal(data)
    })

    it('should detach an event handler (html element)', function () {
      var obj = document.createElement('div')
      evenity.on(obj, 'eventname', handler)
      evenity.emit(obj, 'eventname', data)
      evenity.off(obj, 'eventname', handler)
      evenity.emit(obj, 'eventname', data)  // Should be ignored
      expect(calls.length).to.eql(1)
      expect(calls[0]).to.equal(data)
    })
  })

  describe('#emit()', function () {
    it('should emit an unified event object with data (node\'s style)', function () {
      var obj = new EventEmitter()
      evenity.on(obj, 'eventname', handler)
      evenity.emit(obj, 'eventname', data)
      expect(calls.length).to.eql(1)
      expect(calls[0]).to.equal(data)
    })

    it('should emit an CustomEvent with detail initialized with data (html element)', function () {
      var obj = document.createElement('div')
      evenity.on(obj, 'eventname', handler)
      evenity.emit(obj, 'eventname', data)
      expect(calls.length).to.eql(1)
      expect(calls[0]).to.equal(data)
    })

    it('evenity.emit(obj, event) should emit a custom event (node\'s style)', function () {
      var obj = new EventEmitter()
      evenity.on(obj, 'eventname', handler)
      evenity.emit(obj, { detail: data, type: 'eventname', currentTarget: obj })
      expect(calls.length).to.eql(1)
      expect(calls[0]).to.equal(data)
    })

    it('evenity.emit(obj, event) should emit a browser event (html element)', function () {
      var obj = document.createElement('div')

      var event = new window.MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      })

      evenity.on(obj, 'click', function (event) {
        calls.push(event.type)
        event.preventDefault()
      })

      var canceled = !evenity.emit(obj, event)
      expect(calls.length).to.eql(1)
      expect(calls[0]).to.eql('click')
      expect(canceled).to.eql(true)
    })



    it('evenity.emit(obj, eventname, event) should emit a browser event (html element)', function () {
      var obj = document.createElement('div')

      var event = new window.MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      })

      evenity.on(obj, 'click', function (event) {
        calls.push(event.type)
        event.preventDefault()
      })

      var canceled = !evenity.emit(obj, 'click', event)
      expect(calls.length).to.eql(1)
      expect(calls[0]).to.eql('click')
      expect(canceled).to.eql(true)
    })

    it('evenity.emit(obj, event) should emit a browser event (html element)', function () {
      var obj = document.createElement('div')

      var event = new window.MouseEvent('click', {
        'view': window,
        'bubbles': true,
        'cancelable': true
      })

      evenity.on(obj, 'click', function (event) {
        calls.push(event.type)
        event.preventDefault()
      })

      var canceled = !evenity.emit(obj, event)
      expect(calls.length).to.eql(1)
      expect(calls[0]).to.eql('click')
      expect(canceled).to.eql(true)
    })
  })
})
