export const requiredTypes = `

  interface Node {
    # the creation Date and Time of a node
    createdAt: Float!
  }

  interface Edge {
    # cursor containing an createdAt
    cursor: Float!

    # node containing data of a type
    node: Node
  }

  interface Connection {
    # edges
    edges: [Edge]

    # information for previous or next pages
    pageInfo: PageInfo
  }

  type PageInfo {
    # no previous page available
    hasPreviousPage: Boolean!

    # no next page available
    hasNextPage: Boolean!
  }
  
  extend type Query {
    # An entity in the schema
    node(createdAt: Float!): Node
  }

`;
