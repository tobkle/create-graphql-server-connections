'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addConnections = addConnections;

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _graphql = require('../../util/graphql');

var _constants = require('../../util/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * add Connection Types
 * @private
 * @param {object} schema - the schema to be enhanced
 * @param {object} createConnections - the conns to be created as dictionary
 * @return {object} enhancedSchema - the enhanced schema with connections
 * e.g.:
 * type UserTweetsConnection implements Connection {
 *   edges: [UserTweetsEdge]
 *   pageInfo: PageInfo!
 * }
 */

function addConnections(schema, createConnections) {
  var enhancedSchema = (0, _lodash2.default)(schema);

  Object.keys(createConnections).forEach(function (connection) {
    var fields = [];

    fields.push((0, _graphql.buildField)('edges', [], '[' + createConnections[connection] + ']'));
    fields.push((0, _graphql.buildField)('pageInfo', [], 'PageInfo!'));

    enhancedSchema.definitions.push((0, _graphql.buildTypeDefinition)(connection, fields, _constants.OBJECT_TYPE_DEFINITION, []));
  });

  return enhancedSchema;
}