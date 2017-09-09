// @flow
import { isScalarField } from '../../util/graphql';
import { isList } from './isList';
/**
 * true, if it is a paginated field
 * @public
 * @param {object} field - field
 * @return {boolean} paginated - true, if it is a paginated field
 */

export function isPaginated(field: any): boolean {
  if (isScalarField(field)) {
    return false;
  }
  return isList(field.type);
}
