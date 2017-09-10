'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removePaginateDirective = removePaginateDirective;

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _constants = require('../../util/constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * remove @paginate directive from schema header
 * @public
 * @param {object} schema - schema for the type
 * @return {object} enhancedSchema - schema without @paginate directive
 */

function removePaginateDirective(schema) {
  var enhancedSchema = (0, _lodash2.default)(schema);

  // remove @paginate directive from header
  var type = enhancedSchema.definitions[0];
  type.directives = type.directives.filter(function (directive) {
    return directive.name.value !== _constants.PAGINATION_DIRECTIVE;
  });

  return enhancedSchema;
}