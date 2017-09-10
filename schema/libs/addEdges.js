'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEdges = addEdges;

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../../util/constants');

var _graphql = require('../../util/graphql');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * add Edge Types
 * @private
 * @param {object} schema - the schema to be enhanced
 * @param {object} createEdges - the edges to be created
 * @return {object} enhancedSchema - the enhanced schema with edges
 * @example
 *
 * type UserTweetsEdge implements Edge {
 *   cursor: String!
 *   node: Tweet
 * }
 *
 */

function addEdges(schema, createEdges) {
  var enhancedSchema = (0, _lodash2.default)(schema);

  Object.keys(createEdges).forEach(function (edge) {
    var fields = [];

    fields.push((0, _graphql.buildField)('cursor', [], 'Float!'));
    fields.push((0, _graphql.buildField)('node', [], '' + createEdges[edge]));

    enhancedSchema.definitions.push((0, _graphql.buildTypeDefinition)(edge, fields, _constants.OBJECT_TYPE_DEFINITION, []));
  });

  return enhancedSchema;
}