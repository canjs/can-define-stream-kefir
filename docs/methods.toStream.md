@function can-define-stream-kefir.toStream toStream
@parent can-define-stream-kefir.fns

@description Provide a shorthand for creating a stream on properties and/or events.

@signature `DefineMap.toStream( propAndOrEvent[,event] )`

Creates a stream that gets updated whenever the property value changes or event is triggered.

```js
var DefineMap = require('can-define/map/map');
var canDefineStreamKefir = require("can-define-stream-kefir");

var Person = DefineMap.extend({
    name: "string",
    lastValidName: {
        stream: function() {
            return this.toStream(".name").filter(function(name) { // using propName
                return name.indexOf(" ") >= 0;
            });
        }
    }
});

canDefineStreamKefir(Person);

var me = new Person({name: "James"});

me.on("lastValidName", function(lastValid) {});

me.name = "JamesAtherton"; //lastValidName -> undefined
me.name = "James Atherton"; //lastValidName -> James Atherton
```

@param {String} prop A property name prepended by a dot '.prop'

@param {String} event An event name 'event'

@param {String} propAndEvent A property name prepended by a dot follow by an event name seperated by a space '.prop event'

@return {Stream} A [can-stream] stream.
