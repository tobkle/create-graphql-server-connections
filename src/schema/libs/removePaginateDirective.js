// @flow
import cloneDeep from 'lodash.clonedeep';
import { PAGINATION_DIRECTIVE } from '../../util/constants';

/**
 * remove @paginate directive from schema header
 * @public
 * @param {object} schema - schema for the type
 * @return {object} enhancedSchema - schema without @paginate directive
 */

export function removePaginateDirective(schema: any): any {
  const enhancedSchema = cloneDeep(schema);

  // remove @paginate directive from header
  const type = enhancedSchema.definitions[0];
  type.directives = type.directives.filter(
    directive => directive.name.value !== PAGINATION_DIRECTIVE
  );

  return enhancedSchema;
}
