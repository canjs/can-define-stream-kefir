@module {Object} can-define-stream-kefir can-define-stream-kefir
@parent can-ecosystem
@package ../package.json

@description Exports a function that takes a Type [can-define/map/map] or [can-define/list/list] and uses [can-stream-kefir] to create a streaming object

@type {Object}

The `can-define-stream-kefir` module exports methods useful for converting observable values like [can-compute]s into streams.

```js
var canDefineStream = require("can-define-stream-kefir");
var DefineMap = require("can-define/map/map");

var Person = DefineMap.extend({
    first: "string",
    last: "string",
    fullName: {
        get: function() {
            return this.first + " " + this.last;
        }
    },
    fullNameChangeCount: {
        stream: function() {
            return this.stream(".fullName").scan(function(last) {
                return last + 1;
            }, 0);
        }
    }
});

canDefineStream(Person);

var me = new Person({name: "Justin", last: "Meyer"});

me.on("fullNameChangeCount", function(ev, newVal) {
    console.log(newVal);
});


me.fullNameChangeCount //-> 0

me.first = "Obaid"; //-> console.logs 1
me.last = "Ahmed"; //-> console.logs 2

```

@body

## Usage

For example:

__Update map property based on stream value__

```js
var canDefineStream = require("can-define-stream-kefir");

var Person = DefineMap.extend({
    name: "string",
    lastValidName: {
        stream: function() {
            return this.stream(".name").filter(function(name) {
                return name.indexOf(" ") >= 0;
            });
        }
    }
});

canDefineStream(Person);

var me = new Person({name: "James"});

me.on("lastValidName", function(lastValid) {});

me.name = "JamesAtherton"; //lastValidName -> undefined
me.name = "James Atherton"; //lastValidName -> James Atherton

```
__Stream on DefineList__

```js
var canDefineStream = require("can-define-stream-kefir");

var PeopleList = DefineList.extend({});

canDefineStream(PeopleList);

var people = new PeopleList([
    { first: "Justin", last: "Meyer" },
    { first: "Paula", last: "Strozak" }
]);

var stream = people.stream('length');

stream.onValue(function(val) {
    val //-> 2, 3
});

people.push({
    first: 'Obaid',
    last: 'Ahmed'
}); //-> stream.onValue -> 3

```
