// @flow
import { buildField, buildArgument, getBaseType } from '../../util/graphql';

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

export function addConnectionType(field: any, TypeName: string): any {
  const newArgs = [];
  const createEdges = {};
  const createConnections = {};
  let newField = {};

  const BaseType = getBaseType(field.type).name.value;
  const ConnectionType = `${TypeName}${BaseType}sConnection`;
  const newConnName = `${field.name.value}Connection`;

  // get other arguments of the user's fields
  field.arguments.forEach(argument => {
    // except for other pagination fields...
    if (
      argument.name.value !== 'limit' &&
      argument.name.value !== 'skip' &&
      argument.name.value !== 'lastCreatedAt'
    ) {
      newArgs.push(argument);
    }
  });

  // create a new "<baseType>sConnection" field additionally
  newArgs.push(buildArgument('first', 'Int'));
  newArgs.push(buildArgument('last', 'Int'));
  newArgs.push(buildArgument('before', 'Float'));
  newArgs.push(buildArgument('after', 'Float'));

  // add a new connection field
  newField = buildField(newConnName, newArgs, ConnectionType);

  // add Edges and Connections to our to-be-created-dictionary
  const edgeTypeName = `${TypeName}${BaseType}sEdge`;
  createEdges[edgeTypeName] = `${BaseType}`;
  createConnections[ConnectionType] = `${edgeTypeName}`;

  return { createEdges, createConnections, newField };
}
