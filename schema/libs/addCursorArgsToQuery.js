'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addCursorArgsToQuery = addCursorArgsToQuery;

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _graphql = require('../../util/graphql');

var _isPaginated = require('./isPaginated');

var _constants = require('../../util/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * adding cursor args to query
 * @private
 * @param {object} schema - schema to be enhanced
 * @param {string} mode - pagination mode
 * @return {object} enhancedSchema - enhanced schema with cursor args on Query
 */

function addCursorArgsToQuery(schema, mode) {
  var enhancedSchema = (0, _lodash2.default)(schema);

  enhancedSchema.definitions.filter(function (def) {
    return def.kind === _constants.TYPE_EXTENSION_DEFINITION && def.definition.kind === _constants.OBJECT_TYPE_DEFINITION && def.definition.name.value === _constants.QUERY;
  }).some(function (_ref) {
    var definition = _ref.definition;
    var fields = definition.fields;


    fields.filter(function (field) {
      return (0, _isPaginated.isPaginated)(field);
    }).forEach(function (field) {
      // remove other pagination arguments only, if not in "both" mode
      if (mode === _constants.PAGINATION_CURSOR) {
        field.arguments = field.arguments.filter(function (argument) {
          return argument.name.value !== 'limit' && argument.name.value !== 'skip' && argument.name.value !== 'lastCreatedAt';
        });
      }
      // add cursor-based pagination arguments to the existing field
      field.arguments.push((0, _graphql.buildArgument)('first', 'Int'));
      field.arguments.push((0, _graphql.buildArgument)('last', 'Int'));
      field.arguments.push((0, _graphql.buildArgument)('before', 'Float'));
      field.arguments.push((0, _graphql.buildArgument)('after', 'Float'));
    });
    return true; // end after first match, first found type should be our type
  });

  return enhancedSchema;
}