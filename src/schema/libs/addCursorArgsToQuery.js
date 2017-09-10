// @flow
import cloneDeep from 'lodash.clonedeep';
import { buildArgument } from '../../util/graphql';
import { isPaginated } from './isPaginated';
import {
  OBJECT_TYPE_DEFINITION,
  TYPE_EXTENSION_DEFINITION,
  QUERY,
  PAGINATION_CURSOR
} from '../../util/constants';

/**
 * adding cursor args to query
 * @private
 * @param {object} schema - schema to be enhanced
 * @param {string} mode - pagination mode
 * @return {object} enhancedSchema - enhanced schema with cursor args on Query
 */

export function addCursorArgsToQuery(schema: any, mode: string): any {
  const enhancedSchema = cloneDeep(schema);

  enhancedSchema.definitions
    .filter(
      def =>
        def.kind === TYPE_EXTENSION_DEFINITION &&
        def.definition.kind === OBJECT_TYPE_DEFINITION &&
        def.definition.name.value === QUERY
    )
    .some(({ definition }) => {
      const { fields } = definition;

      fields.filter(field => isPaginated(field)).forEach(field => {
        // remove other pagination arguments only, if not in "both" mode
        if (mode === PAGINATION_CURSOR) {
          field.arguments = field.arguments.filter(
            argument =>
              argument.name.value !== 'limit' &&
              argument.name.value !== 'skip' &&
              argument.name.value !== 'lastCreatedAt'
          );
        }
        // add cursor-based pagination arguments to the existing field
        field.arguments.push(buildArgument('first', 'Int'));
        field.arguments.push(buildArgument('last', 'Int'));
        field.arguments.push(buildArgument('before', 'Float'));
        field.arguments.push(buildArgument('after', 'Float'));
      });
      return true; // end after first match, first found type should be our type
    });

  return enhancedSchema;
}
