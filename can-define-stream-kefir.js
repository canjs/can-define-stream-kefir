var namespace = require('can-util/namespace');
var canDefineStream = require('can-define-stream');
var canStreamKefir = require('can-stream-kefir');

module.exports = namespace.defineStreamKefir = canDefineStream(canStreamKefir);
