'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPaginationMode = getPaginationMode;

var _constants = require('../../util/constants');

/**
 * checks, if there is a @paginate directive in the header and returns which
 * @public
 * @param {object} directives - header directives of the type
 * @return {string} mode - PAGINATION_SIMPLE, PAGINATION_CURSOR, PAGINATION_BOTH
 */

function getPaginationMode(directives) {
  var mode = _constants.PAGINATION_SIMPLE;
  var modes = [];

  directives.filter(function (directive) {
    return directive.name.value === _constants.PAGINATION_DIRECTIVE;
  }).some(function (directive) {
    directive.arguments.filter(function (argument) {
      return argument.name.value === _constants.PAGINATION_BY;
    }).forEach(function (argument) {
      if (argument.value.values) {
        argument.value.values.filter(function (value) {
          return value.value === _constants.PAGINATION_SIMPLE || value.value === _constants.PAGINATION_CURSOR || value.value === _constants.PAGINATION_BOTH;
        }).forEach(function (value) {
          return modes.push(value.value);
        });
      } else if (argument.value.value === _constants.PAGINATION_SIMPLE || argument.value.value === _constants.PAGINATION_CURSOR || argument.value.value === _constants.PAGINATION_BOTH) {
        modes.push(argument.value.value);
      }
      return true;
    });
  });

  if (modes.length > 1) {
    return _constants.PAGINATION_BOTH;
  } else if (modes.length === 1) {
    return modes[0];
  }
  return mode;
}