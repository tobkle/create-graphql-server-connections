'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _kinds = require('graphql/language/kinds');

Object.defineProperty(exports, 'NAME', {
  enumerable: true,
  get: function get() {
    return _kinds.NAME;
  }
});
Object.defineProperty(exports, 'ARGUMENT', {
  enumerable: true,
  get: function get() {
    return _kinds.ARGUMENT;
  }
});
Object.defineProperty(exports, 'NAMED_TYPE', {
  enumerable: true,
  get: function get() {
    return _kinds.NAMED_TYPE;
  }
});
Object.defineProperty(exports, 'LIST_TYPE', {
  enumerable: true,
  get: function get() {
    return _kinds.LIST_TYPE;
  }
});
Object.defineProperty(exports, 'NON_NULL_TYPE', {
  enumerable: true,
  get: function get() {
    return _kinds.NON_NULL_TYPE;
  }
});
Object.defineProperty(exports, 'FIELD_DEFINITION', {
  enumerable: true,
  get: function get() {
    return _kinds.FIELD_DEFINITION;
  }
});
Object.defineProperty(exports, 'DIRECTIVE', {
  enumerable: true,
  get: function get() {
    return _kinds.DIRECTIVE;
  }
});
Object.defineProperty(exports, 'LIST', {
  enumerable: true,
  get: function get() {
    return _kinds.LIST;
  }
});
Object.defineProperty(exports, 'INT', {
  enumerable: true,
  get: function get() {
    return _kinds.INT;
  }
});
Object.defineProperty(exports, 'STRING', {
  enumerable: true,
  get: function get() {
    return _kinds.STRING;
  }
});
Object.defineProperty(exports, 'DOCUMENT', {
  enumerable: true,
  get: function get() {
    return _kinds.DOCUMENT;
  }
});
Object.defineProperty(exports, 'OBJECT_TYPE_DEFINITION', {
  enumerable: true,
  get: function get() {
    return _kinds.OBJECT_TYPE_DEFINITION;
  }
});
Object.defineProperty(exports, 'TYPE_EXTENSION_DEFINITION', {
  enumerable: true,
  get: function get() {
    return _kinds.TYPE_EXTENSION_DEFINITION;
  }
});


// name of the @paginate directive, which triggers pagination logic
var PAGINATION_DIRECTIVE = exports.PAGINATION_DIRECTIVE = 'paginate';
var PAGINATION_BY = exports.PAGINATION_BY = 'by';
var PAGINATION_BOTH = exports.PAGINATION_BOTH = 'both';
var PAGINATION_SIMPLE = exports.PAGINATION_SIMPLE = 'simple';
var PAGINATION_CURSOR = exports.PAGINATION_CURSOR = 'cursor';
var QUERY = exports.QUERY = 'Query';