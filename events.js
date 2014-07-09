
/* a Customable Event JavaScript library for modern explorer */
/*
* EventEmitter
* @options : { bubbles: <Boolean>, cancelable: <Boolean> }
* method:
* .emit @eName, @data
* .on @eName, @cb(@e): @data is the attribute "detail" of argument @e of cb 
* .onOnce @eName, @cb(@e): the eName event can only triggered one time 
* .removeListener @eName, @cb: remove the given listener for eName
*
* * NOTICE: the whole html page share the variable "_proto",
*           so every object create by EventEmitter share _proto,
*           once the same name event were binded, 
*           all binding listener for this event will execute when it triggers
*
*/
(function (global) {

  if (!global.CustomEvent)
    throw new Error('your browser doesnt support custom events');

  var _proto = global.document.createElement('i');

  var EventEmitter = function (options) {
    this.MAXListener = options.MAXListener || 100;
    this.config = options.config || { bubbles: false, cancelable: false };
    //this._event = {};
  };

  EventEmitter.prototype.emit = function (eName, data) {
    var settings = {};
    for (var i in this.config)
      if (this.config.hasOwnProperty(i))
        settings[i] = this.config[i];
    settings.detail = data;
    var event = new CustomEvent(eName, settings);
    _proto.dispatchEvent(event);
  };

  EventEmitter.prototype.on = function (eName, cb) {
    _proto.addEventListener(eName, cb, false);
  };

  EventEmitter.prototype.onOnce = function (eName, cb) {
    var handler = function (e) {
      cb(e);
      _proto.removeListener(eName, handler);
    };
    _proto.addEventListener(eName, handler, false);
  };

  EventEmitter.prototype.removeListener = function (eName, cb) {
    _proto.removeListener(eName, cb);
  };

  global.EventEmitter = EventEmitter;
})(this);