export default const requiredTypes = `

  interface Node {
    # the ObjID of a node
    id: ObjID!
  }

  interface Edge {
    # cursor containing an ObjID
    cursor: String!

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
    node(id: ObjID!): Node
  }

`;