// @flow
import cloneDeep from 'lodash.clonedeep';
import { OBJECT_TYPE_DEFINITION } from '../../util/constants';
import { buildField, buildTypeDefinition } from '../../util/graphql';

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

export function addEdges(schema: any, createEdges: any): any {
  const enhancedSchema = cloneDeep(schema);

  Object.keys(createEdges).forEach(edge => {
    const fields = [];

    fields.push(buildField('cursor', [], 'Float!'));
    fields.push(buildField('node', [], `${createEdges[edge]}`));

    enhancedSchema.definitions.push(
      buildTypeDefinition(edge, fields, OBJECT_TYPE_DEFINITION, [])
    );
  });

  return enhancedSchema;
}
