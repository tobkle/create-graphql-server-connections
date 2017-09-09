// @flow
import cloneDeep from 'lodash.clonedeep';
import { buildField, buildTypeDefinition } from '../../util/graphql';
import { OBJECT_TYPE_DEFINITION } from '../../util/constants';

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

export function addConnections(schema: any, createConnections: any): any {
  const enhancedSchema = cloneDeep(schema);

  Object.keys(createConnections).forEach(connection => {
    const fields = [];

    fields.push(buildField('edges', [], `[${createConnections[connection]}]`));
    fields.push(buildField('pageInfo', [], 'PageInfo!'));

    enhancedSchema.definitions.push(
      buildTypeDefinition(connection, fields, OBJECT_TYPE_DEFINITION, [])
    );
  });

  return enhancedSchema;
}
