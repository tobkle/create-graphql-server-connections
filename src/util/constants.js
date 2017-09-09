// @flow
/* eslint-disable max-len */
/* eslint-disable flowtype/no-weak-types */

// kinds from graphql language
export {
  NAME,
  ARGUMENT,
  NAMED_TYPE,
  LIST_TYPE,
  NON_NULL_TYPE,
  FIELD_DEFINITION,
  DIRECTIVE,
  LIST,
  INT,
  STRING,
  DOCUMENT,
  OBJECT_TYPE_DEFINITION,
  TYPE_EXTENSION_DEFINITION
} from 'graphql/language/kinds';

// name of the @paginate directive, which triggers pagination logic
export const PAGINATION_DIRECTIVE = 'paginate';
export const PAGINATION_BY = 'by';
export const PAGINATION_BOTH = 'both';
export const PAGINATION_SIMPLE = 'simple';
export const PAGINATION_CURSOR = 'cursor';
export const QUERY = 'Query';
