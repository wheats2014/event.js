
/* a Customable UI-non-blocking Event JavaScript library for modern explorer */
/*
* EventEmitter
* @options : { bubbles: <Boolean>, cancelable: <Boolean> }
* method:
* .emit @eName, @data
* .on @eName, @cb(@e): @data is the attribute "detail" of argument @e of cb 
* .once @eName, @cb(@e): the eName event can only triggered one time 
* .removeListener @eName, @cb: remove the given listener for eName
*
*/
(function (global) {

  if (!global.CustomEvent)
    throw new Error('your browser doesnt support custom events');

  var EventEmitter = function (options) {
    this.MAXListener = options ? (options.MAXListener || 100) : 100;
    this.listener = 0;
    this.bubbles = options ? (options.bubbles || false) : false;
    this.cancelable = options ? (options.cancelable || false) : false;
    // make the _proto property private and readonly
    Object.defineProperty(this, '_proto', {
      value: global.document.createElement('i'),
      writeable: false,
      enumerable: false,
      configurable: false
    });

    // freeze the core event object
    Object.freeze(this._proto);
  };

  EventEmitter.prototype.emit = function (eName, data) {
    var _self = this;
    var settings = {};
    for (var i in _self)
      if (_self.hasOwnProperty(i))
        settings[i] = _self[i];
    settings.detail = data;

    // create a new event with above settings
    var event = new CustomEvent(eName, settings);
    _self._proto.dispatchEvent(event);
  };

  EventEmitter.prototype.on = function (eName, cb) {
    var _self = this;
    if (_self.listener + 1 > _self.MAXListener)
      return new Error('up to MAX Listeners limit');

    // ref to the real callback for removing operation
    cb._supercb = function (e) {
      cb(e.detail);
    };
    _self._proto.addEventListener(eName, cb._supercb, false);
    _self.listener++;
  };

  EventEmitter.prototype.once = function (eName, cb) {
    var _self = this;
    if (_self.listener + 1 > _self.MAXListener)
      return new Error('up to MAX Listeners limit');

    cb._supercb = function (e) {
      cb(e.detail);
      _self._proto.removeEventListener(eName, cb._supercb);
      _self.listener--;
    };
    _self._proto.addEventListener(eName, cb._supercb, false);
    _self.listener++;
  };

  EventEmitter.prototype.removeListener = function (eName, cb) {
    var _self = this;
    _self._proto.removeEventListener(eName, cb._supercb);
  };

  global.EventEmitter = EventEmitter;
})(this);