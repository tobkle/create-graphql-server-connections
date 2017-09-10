'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enhanceSchemaWithConnections = enhanceSchemaWithConnections;

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.merge');

var _lodash4 = _interopRequireDefault(_lodash3);

var _graphql = require('../util/graphql');

var _addConnectionType = require('./libs/addConnectionType');

var _addCursorArgsToQuery = require('./libs/addCursorArgsToQuery');

var _addEdges = require('./libs/addEdges');

var _addConnections = require('./libs/addConnections');

var _getPaginationMode = require('./libs/getPaginationMode');

var _isPaginated = require('./libs/isPaginated');

var _removePaginateDirective = require('./libs/removePaginateDirective');

var _replaceWithCursor = require('./libs/replaceWithCursor');

var _constants = require('../util/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * returns an enhanced schema with cursor based pagination
 * @public
 * @param {object} schema - the base schema to work with
 * @return {object} enhancedSchema - enhanced schema for cursor based pagination
 */

function enhanceSchemaWithConnections(schema) {
  var enhancedSchema = (0, _lodash2.default)(schema);
  var createEdges = {};
  var createConnections = {};
  var TypeName = '';
  var mode = _constants.PAGINATION_SIMPLE;

  if (enhancedSchema.kind === _constants.DOCUMENT) {
    enhancedSchema.definitions.filter(function (def) {
      return def.kind === _constants.OBJECT_TYPE_DEFINITION;
    }).some(function (_ref) {
      var fields = _ref.fields,
          name = _ref.name,
          directives = _ref.directives,
          interfaces = _ref.interfaces;

      TypeName = name.value;

      // add interface "implements Node"
      interfaces.push((0, _graphql.buildTypeReference)('Node'));

      fields.filter(function (field) {
        return (0, _isPaginated.isPaginated)(field);
      }).forEach(function (field) {
        mode = (0, _getPaginationMode.getPaginationMode)(directives);

        if (mode === _constants.PAGINATION_CURSOR) {
          var toAdd = (0, _replaceWithCursor.replaceWithCursor)(field, TypeName);
          field.arguments = toAdd.newArgs;
          field.name.value = toAdd.fieldName;
          field.type = toAdd.fieldType;
          createEdges = (0, _lodash4.default)(createEdges, toAdd.createEdges);
          createConnections = (0, _lodash4.default)(createConnections, toAdd.createConnections);
        } else if (mode === _constants.PAGINATION_BOTH) {
          var _toAdd = (0, _addConnectionType.addConnectionType)(field, TypeName);
          fields.push(_toAdd.newField);
          createEdges = (0, _lodash4.default)(createEdges, _toAdd.createEdges);
          createConnections = (0, _lodash4.default)(createConnections, _toAdd.createConnections);
        }
      });
      return true; // end after first match, first ObjectType is our type
    });

    // add cursor arguments to the Query extend
    if (mode === _constants.PAGINATION_CURSOR || mode === _constants.PAGINATION_BOTH) {
      enhancedSchema = (0, _addCursorArgsToQuery.addCursorArgsToQuery)(enhancedSchema, mode);
    }

    // finally add the edgeTypes and connectionTypes, but only once
    enhancedSchema = (0, _addEdges.addEdges)(enhancedSchema, createEdges);
    enhancedSchema = (0, _addConnections.addConnections)(enhancedSchema, createConnections);
    enhancedSchema = (0, _removePaginateDirective.removePaginateDirective)(enhancedSchema);
  }

  return enhancedSchema;
}