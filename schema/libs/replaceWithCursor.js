'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceWithCursor = replaceWithCursor;

var _graphql = require('../../util/graphql');

/**
 * prepares to adjust a paginated type with a cursor based paginated type
 * @private
 * @param {object} field - the current paginated field
 * @param {string} TypeName - name of the type
 * @return {object} toAdd - changes to adjust
 * @property {object} createEdges - edge types to be added
 * @property {object} createConnections - connection types to be added
 * @property {array} newArgs - paging arguments to be added to the field
 * @property {array} fieldName - the suggested field name for the connection
 * @property {array} fieldType - the suggested field type for the connection
 */

function replaceWithCursor(field, TypeName) {
  var newArgs = [];
  var createEdges = {};
  var createConnections = {};

  var BaseType = (0, _graphql.getBaseType)(field.type).name.value;
  var ConnectionType = '' + TypeName + BaseType + 'sConnection';
  var newConnName = field.name.value + 'Connection';

  // remove other pagination arguments
  if (field.arguments.length > 0) {
    newArgs = field.arguments.filter(function (argument) {
      return argument.name.value !== 'limit' && argument.name.value !== 'skip' && argument.name.value !== 'lastCreatedAt';
    });
  }

  // add cursor-based pagination arguments to the existing field
  newArgs.push((0, _graphql.buildArgument)('first', 'Int'));
  newArgs.push((0, _graphql.buildArgument)('last', 'Int'));
  newArgs.push((0, _graphql.buildArgument)('before', 'Float'));
  newArgs.push((0, _graphql.buildArgument)('after', 'Float'));

  // add Edges and Connections to our to-create-list
  var edgeTypeName = '' + TypeName + BaseType + 'sEdge';
  createEdges[edgeTypeName] = '' + BaseType;
  createConnections[ConnectionType] = '' + edgeTypeName;

  return {
    createEdges: createEdges,
    createConnections: createConnections,
    newArgs: newArgs,
    fieldName: newConnName,
    fieldType: (0, _graphql.buildTypeReference)(ConnectionType)
  };
}