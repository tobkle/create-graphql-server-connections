'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPaginationContext = getPaginationContext;

var _schema = require('../schema');

var _constants = require('../util/constants');

/**
 * returns an enhanced schema with cursor based pagination
 * @public
 * @param {object} schema - the base schema to work with
 * @return {object} paginationContext - context information about pagination
 * @property {boolean} isSimplePagination - true, if simple pagination only
 * @property {boolean} isCursorPagination - true, if cursor pagination only
 * @property {boolean} isBothPagination - true, if both pagination types apply
 */

function getPaginationContext(schema) {
  var paginationMode = (0, _schema.getPaginationMode)(schema.definitions[0].directives);

  return {
    paginationMode: paginationMode,
    isSimplePagination: paginationMode === _constants.PAGINATION_SIMPLE,
    isCursorPagination: paginationMode === _constants.PAGINATION_CURSOR,
    isBothPagination: paginationMode === _constants.PAGINATION_BOTH
  };
}