// @flow
import {
  buildArgument,
  buildTypeReference,
  getBaseType
} from '../../util/graphql';

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

export function replaceWithCursor(field: any, TypeName: string): any {
  let newArgs = [];
  const createEdges = {};
  const createConnections = {};

  const BaseType = getBaseType(field.type).name.value;
  const ConnectionType = `${TypeName}${BaseType}sConnection`;
  const newConnName = `${field.name.value}Connection`;

  // remove other pagination arguments
  if (field.arguments.length > 0) {
    newArgs = field.arguments.filter(
      argument =>
        argument.name.value !== 'limit' &&
        argument.name.value !== 'skip' &&
        argument.name.value !== 'lastCreatedAt'
    );
  }

  // add cursor-based pagination arguments to the existing field
  newArgs.push(buildArgument('first', 'Int'));
  newArgs.push(buildArgument('last', 'Int'));
  newArgs.push(buildArgument('before', 'Float'));
  newArgs.push(buildArgument('after', 'Float'));

  // add Edges and Connections to our to-create-list
  const edgeTypeName = `${TypeName}${BaseType}sEdge`;
  createEdges[edgeTypeName] = `${BaseType}`;
  createConnections[ConnectionType] = `${edgeTypeName}`;

  return {
    createEdges,
    createConnections,
    newArgs,
    fieldName: newConnName,
    fieldType: buildTypeReference(ConnectionType)
  };
}
