
/* a Customable non-blocked Event JavaScript library for modern explorer */
/*
* EventEmitter
* @options : { bubbles: <Boolean>, cancelable: <Boolean> }
* method:
* .emit @eName, @data
* .on @eName, @cb(@e): @data is the attribute "detail" of argument @e of cb 
* .onOnce @eName, @cb(@e): the eName event can only triggered one time 
* .removeListener @eName, @cb: remove the given listener for eName
*
*/
(function (global) {

  if (!global.CustomEvent)
    throw new Error('your browser doesnt support custom events');

  //var _proto = global.document.createElement('i');

  var EventEmitter = function (options) {
    this.MAXListener = options ? (options.MAXListener || 100) : 100;
    this.config = options ? 
      (options.config || { bubbles: false, cancelable: false }) : 
      { bubbles: false, cancelable: false };
    
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
    for (var i in _self.config)
      if (_self.config.hasOwnProperty(i))
        settings[i] = _self.config[i];
    settings.detail = data;

    // create a new event with above settings
    var event = new CustomEvent(eName, settings);
    _self._proto.dispatchEvent(event);
  };

  EventEmitter.prototype.on = function (eName, cb) {
    var _self = this;
    _self._proto.addEventListener(eName, cb, false);
  };

  EventEmitter.prototype.onOnce = function (eName, cb) {
    var _self = this;
    var handler = function (e) {
      cb(e);
      _self._proto.removeEventListener(eName, handler);
    };
    _self._proto.addEventListener(eName, handler, false);
  };

  EventEmitter.prototype.removeListener = function (eName, cb) {
    var _self = this;
    _self._proto.removeEventListener(eName, cb);
  };

  global.EventEmitter = EventEmitter;
})(this);