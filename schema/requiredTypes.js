"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var requiredTypes = exports.requiredTypes = "\n\n  interface Node {\n    # the creation Date and Time of a node\n    createdAt: Float!\n  }\n\n  interface Edge {\n    # cursor containing an createdAt\n    cursor: Float!\n\n    # node containing data of a type\n    node: Node\n  }\n\n  interface Connection {\n    # edges\n    edges: [Edge]\n\n    # information for previous or next pages\n    pageInfo: PageInfo\n  }\n\n  type PageInfo {\n    # no previous page available\n    hasPreviousPage: Boolean!\n\n    # no next page available\n    hasNextPage: Boolean!\n  }\n  \n  extend type Query {\n    # An entity in the schema\n    node(createdAt: Float!): Node\n  }\n\n";