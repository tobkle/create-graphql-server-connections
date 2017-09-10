'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isList = isList;

var _constants = require('../../util/constants');

/**
 * true, if it is a list type
 * @public
 * @param {object} type - ast type definition
 * @return {boolean} list - true, if it is a list
 */

function isList(type) {
  if (type.kind && type.kind === _constants.LIST_TYPE) {
    return true;
  } else if (type.type) {
    return isList(type.type);
  }
  return false;
}