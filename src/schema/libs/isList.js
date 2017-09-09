// @flow
import { LIST_TYPE } from '../../util/constants';

/**
 * true, if it is a list type
 * @public
 * @param {object} type - ast type definition
 * @return {boolean} list - true, if it is a list
 */

export function isList(type: any): boolean {
  if (type.kind && type.kind === LIST_TYPE) {
    return true;
  } else if (type.type) {
    return isList(type.type);
  }
  return false;
}
