// @flow

import { getPaginationMode } from '../schema';
import {
  PAGINATION_SIMPLE,
  PAGINATION_CURSOR,
  PAGINATION_BOTH
} from '../util/constants';

/**
 * returns an enhanced schema with cursor based pagination
 * @public
 * @param {object} schema - the base schema to work with
 * @return {object} paginationContext - context information about pagination
 * @property {boolean} isSimplePagination - true, if simple pagination only
 * @property {boolean} isCursorPagination - true, if cursor pagination only
 * @property {boolean} isBothPagination - true, if both pagination types apply
 */

export function getPaginationContext(
  schema: any
): {
  paginationMode: string,
  isSimplePagination: boolean,
  isCursorPagination: boolean,
  isBothPagination: boolean
} {
  const paginationMode = getPaginationMode(schema.definitions[0].directives);

  return {
    paginationMode,
    isSimplePagination: paginationMode === PAGINATION_SIMPLE,
    isCursorPagination: paginationMode === PAGINATION_CURSOR,
    isBothPagination: paginationMode === PAGINATION_BOTH
  };
}
