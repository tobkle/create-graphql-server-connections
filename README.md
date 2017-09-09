[![npm version](https://badge.fury.io/js/create-graphql-server-connections.svg)](http://badge.fury.io/js/create-graphql-server-connections) [![Build Status](https://travis-ci.org/tobkle/create-graphql-server-connections.svg?branch=master)](https://travis-ci.org/tobkle/create-graphql-server-connections) [![Coverage Status](https://coveralls.io/repos/github/tobkle/create-graphql-server-connections/badge.svg?branch=master)](https://coveralls.io/github/tobkle/create-graphql-server-connections?branch=master)

# create-graphql-server-connections

Build Relay like connections for cursor based pagination.

For array-like fields, you can generate a connection with forward and backward pagination, using first, last, before, after. The pagination starts after applying e.g. filters and orderBys on the remaining document result set.

[It implements the algorithm of the Relay connection specification.](https://facebook.github.io/relay/graphql/connections.htm#sec-Edges)

Its generator is triggered only, if there is a directive "@connect"
* on the header
* on the paginated field

If the directive appears on header level, all paginated fields will get cursor-based connections.
If the directive appears on a paginated field, this field will get a cursor-based connection.

## Purpose
You build a GraphQL server with the npm package "create-graphql-server", which serves as a backend generator to web applications. This "create-graphql-server" generates schemas, resolvers and models for an express-js server.

This package enhances the generator to build additional pagination arguments and required resolvers.

It provides the following additional arguments:

Use:
* [<first>] <after>
* [<last>] <before>

### Forward Pagination
Forward Pagination returns edges (documents), which are coming after the cursor <after> (which is a document's ObjID in our case). It returns at most a number of <first> edges.

The arguments:
* first: takes a non-negative integer
* after: takes the cursor type
 
### Backward Pagination 
Backward Pagination returns edges (documents), which are coming before the cursor <before>. It returns at most a number of <last> edges.

The arguments:
* last: takes a non-negative integer
* before: takes the cursor type

## Installation


If you are having troubles somewhere, have a look into the running example at:
[tobkle/create-graphql-server branch: Authorization+Arguments](https://github.com/tobkle/create-graphql-server/tree/Relay-Pagination)

## Documentation
[API Documentation](https://tobkle.github.io/create-graphql-server-connections/)

## Tests
```bash
yarn test
```

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
