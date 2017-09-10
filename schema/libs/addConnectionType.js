'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addConnectionType = addConnectionType;

var _graphql = require('../../util/graphql');

/**
 * prepares to add a new connection type
 * @private
 * @param {object} field - the current paginated field
 * @param {string} TypeName - name of the type
 * @return {object} toAdd - changes to adjust
 * @property {object} createEdges - edge types to be added
 * @property {object} createConnections - connection types to be added
 * @property {object} newField - field to be added
 */

function addConnectionType(field, TypeName) {
  var newArgs = [];
  var createEdges = {};
  var createConnections = {};
  var newField = {};

  var BaseType = (0, _graphql.getBaseType)(field.type).name.value;
  var ConnectionType = '' + TypeName + BaseType + 'sConnection';
  var newConnName = field.name.value + 'Connection';

  // get other arguments of the user's fields
  field.arguments.forEach(function (argument) {
    // except for other pagination fields...
    if (argument.name.value !== 'limit' && argument.name.value !== 'skip' && argument.name.value !== 'lastCreatedAt') {
      newArgs.push(argument);
    }
  });

  // create a new "<baseType>sConnection" field additionally
  newArgs.push((0, _graphql.buildArgument)('first', 'Int'));
  newArgs.push((0, _graphql.buildArgument)('last', 'Int'));
  newArgs.push((0, _graphql.buildArgument)('before', 'Float'));
  newArgs.push((0, _graphql.buildArgument)('after', 'Float'));

  // add a new connection field
  newField = (0, _graphql.buildField)(newConnName, newArgs, ConnectionType);

  // add Edges and Connections to our to-be-created-dictionary
  var edgeTypeName = '' + TypeName + BaseType + 'sEdge';
  createEdges[edgeTypeName] = '' + BaseType;
  createConnections[ConnectionType] = '' + edgeTypeName;

  return { createEdges: createEdges, createConnections: createConnections, newField: newField };
}