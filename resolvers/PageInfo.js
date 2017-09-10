"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* eslint-disable no-unused-vars */

var resolvers = {
  PageInfo: {
    hasPreviousPage: function hasPreviousPage(pageInfo, args, _ref) {
      var PageInfo = _ref.PageInfo,
          me = _ref.me;

      return pageInfo.hasPreviousPage;
    },
    hasNextPage: function hasNextPage(pageInfo, args, _ref2) {
      var PageInfo = _ref2.PageInfo,
          me = _ref2.me;

      return pageInfo.hasNextPage;
    }
  }
};

exports.default = resolvers;