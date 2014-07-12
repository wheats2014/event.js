event.js V0.0.2
===

a async & UI-non-blocking event-customable frontend library

it can create JavaScript Obejcts obtain HTMLElement's feature---Event Driven

all the events' workflow is providen by DOM Event Model

example:

```

  var spore = new EventEmitter();

  spore.on('growup', function (e) {
    var data = e.detail;
    console.log(data);
  });

  spore.on('die', function (e) {
    // ...
  });

  spore.emit('born', { size: 0.05, color: blue });

```

other usages && options:

```

  EventEmitter(options)

  the options is an object, all the events follow this setting:
  {
    MAXListener: <Number>
    config: {
      bubbles: <Boolean>
      cancelable: <Boolean>
    }
  }

  method:
    .emit()
    .on()
    .onOnce()
    .removeListener()
```