// @flow
import {
  PAGINATION_DIRECTIVE,
  PAGINATION_BY,
  PAGINATION_SIMPLE,
  PAGINATION_CURSOR,
  PAGINATION_BOTH
} from '../../util/constants';

/**
 * checks, if there is a @paginate directive in the header and returns which
 * @public
 * @param {object} directives - header directives of the type
 * @return {string} mode - PAGINATION_SIMPLE, PAGINATION_CURSOR, PAGINATION_BOTH
 */

export function getPaginationMode(directives: any): string {
  const mode = PAGINATION_SIMPLE;
  const modes = [];

  directives
    .filter(directive => directive.name.value === PAGINATION_DIRECTIVE)
    .some(directive => {
      directive.arguments
        .filter(argument => argument.name.value === PAGINATION_BY)
        .forEach(argument => {
          if (argument.value.values) {
            argument.value.values
              .filter(
                value =>
                  value.value === PAGINATION_SIMPLE ||
                  value.value === PAGINATION_CURSOR ||
                  value.value === PAGINATION_BOTH
              )
              .forEach(value => modes.push(value.value));
          } else if (
            argument.value.value === PAGINATION_SIMPLE ||
            argument.value.value === PAGINATION_CURSOR ||
            argument.value.value === PAGINATION_BOTH
          ) {
            modes.push(argument.value.value);
          }
          return true;
        });
    });

  if (modes.length > 1) {
    return PAGINATION_BOTH;
  } else if (modes.length === 1) {
    return modes[0];
  }
  return mode;
}
