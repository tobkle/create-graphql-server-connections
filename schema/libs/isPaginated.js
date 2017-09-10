'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPaginated = isPaginated;

var _graphql = require('../../util/graphql');

var _isList = require('./isList');

/**
 * true, if it is a paginated field
 * @public
 * @param {object} field - field
 * @return {boolean} paginated - true, if it is a paginated field
 */

function isPaginated(field) {
  if ((0, _graphql.isScalarField)(field)) {
    return false;
  }
  return (0, _isList.isList)(field.type);
}