[![npm version](https://badge.fury.io/js/create-graphql-server-connections.svg)](http://badge.fury.io/js/create-graphql-server-connections) [![Build Status](https://travis-ci.org/tobkle/create-graphql-server-connections.svg?branch=master)](https://travis-ci.org/tobkle/create-graphql-server-connections) [![Coverage Status](https://coveralls.io/repos/github/tobkle/create-graphql-server-connections/badge.svg?branch=master)](https://coveralls.io/github/tobkle/create-graphql-server-connections?branch=master)

# create-graphql-server-connections

Build Relay like connections for cursor based pagination.

TODO: First prototype. Didn't do thoroughly testing so far.

For array-like fields, you can generate a connection with forward and backward pagination, using first, last, before, after. The pagination starts after applying e.g. filters and orderBys on the remaining document result set.

[It implements the algorithm of the Relay connection specification.](https://facebook.github.io/relay/graphql/connections.htm#sec-Edges)

Its generator is triggered only, if there is a directive on header level. If the directive appears, all paginated fields will get cursor-based connections.
```javascript
@paginate(by: "cursor")
```

If you want to have the "simple" pagination for a type instead, use the following or don't enter the paginate directive.
```javascript 
@paginate(by: "simple")
```

You can also combine both, meaning all paginated fields will be added to the schema as "simple" paginated fields, but also as a duplicate named as <field>Connection. The latter one will be added as "cursor" based paginated field. Use one of the following alternatives therefore:
```javascript
@paginate(by: "both")
or:
@paginate(by: ["simple", "cursor"])
```

## Purpose
You build a GraphQL server with the npm package "create-graphql-server", which serves as a backend generator to web applications. This "create-graphql-server" generates schemas, resolvers and models for an express-js server.

This package enhances the generator to build additional pagination arguments and required resolvers.

It provides the following additional arguments:

Use:
* "first" "after"
* "last" "before"

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

### Adjust schema
In create-graphql-server go to "generate/schema/index".

Add the following code. The import at the beginning the rest at the end of the file.
```javascript
import { enhanceSchemaWithConnections } from 'create-graphql-server-connections';  // <=== here
...
...
  const outputSchema = enhanceSchemaWithConnections(outputSchema);   // <=== here
  return outputSchema;
}
```

### Adjust model
In create-graphql-server go to "generate/model/index".

Adjust the following code.
```javascript
...
import { templates } from 'create-graphql-server-connections';     // <=== here

...

export function generateModelAst(inputSchema) {
  // the last template path, determines the start template: type/default
  // the last path has the highest priority and may overwrite
  // partial templates, if they have equal names
  const templateCode = getCode(MODEL, {
    inputSchema,
    templatePaths: [
      templates.model,                                             // <=== here
      [modulePath, 'templates', 'model', 'auth'],
      [__dirname, 'templates'],
    ]
  });

...

 }
```

### Adjust resolver
In create-graphql-server go to "generate/resolvers/index".

Adjust the following code.
```javascript
...
import { templates } from 'create-graphql-server-connections';     // <=== here

...

export function generateModelAst(inputSchema) {
  // the last template path, determines the start template: type/default
  // the last path has the highest priority and may overwrite
  // partial templates, if they have equal names
  const templateCode = getCode(MODEL, {
    inputSchema,
    templatePaths: [
      templates.resolvers,                                         // <=== here
      [modulePath, 'templates', 'model', 'auth'],
      [__dirname, 'templates'],
    ]
  });

...

 }
```

### Adjust resolver templates
In create-graphql-server go to "generate/resolvers/templates/default"

Change "default_default" template, to this:
```javascript
/* eslint-disable prettier */
/* eslint comma-dangle: [2, "only-multiline"] */
const resolvers = {
{{> connectionTypes}}                     // <=== here
  {{TypeName}}: {
    id({{typeName}}) {
      return {{typeName}}._id;
    },
{{#each singularFields}}
{{> defaultSingularField }}
{{/each}}
{{> connectionPaginatedFields}}          // <=== here

  },
  Query: {
    {{typeName}}s(root, args, { {{TypeName}}, me }) {
      return {{TypeName}}.find(args, me, '{{typeName}}s');
    },

    {{typeName}}(root, { id }, { {{TypeName}}, me }) {
      return {{TypeName}}.findOneById(id, me, '{{typeName}}');
    }
  },

...
```
Please add these to referenced partial templates "connectionTypes" and "connectionPaginatedFields" to the resolver.
These two partials are coming from this npm module. 

If you have create-graphql-server-authorization installed as well, do the same adjustments with your template "authorize_default".

### Adjust model templates
In create-graphql-server go to "generate/model/templates"

Do the same for all templates:
* default/default_default.template
* user/default_user.template

If you have "create-graphql-server-authorization" implemented, do it also for
* authorize_default.template
* authorize_user.template

Change "default/default_default.template" template. Replace all three lines:
```javascript
{{#each paginatedFields }}
{{> defaultPaginatedField }}
{{/each}}
```

by this:
```javascript
{{> connectionPaginatedFields}}
```

### Add default resolver for pageInfo
In create-graphql-server go to "skel/resolvers/index.js". We have to add it here, as it is valid for all generated types, but we can add it only once.

Adjust the code...
```javascript

...
import { resolvers } from 'create-graphql-server-connections';   // <=== here
merge(resolvers, resolvers.pageInfo);                            // <=== here

export default resolvers;
```
Do the same in "test/output-app/resolvers/index.js"

### Add paginate to the server context
In create-graphql-server go to "skel/server/index.js".
```javascript
...
import { paginate } from 'create-graphql-server-connections';                       // <=== here
...

app.use('/graphql', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, me) => {
    req.context = addModelsToContext({ 
      db, pubsub, me, UserCollection, findByIds, log, prepareQueries, paginate     // <=== here
    });
    graphqlExpress(() => {
...
...
	})
  })
})
```
Do the same in "test/output-app/server/index.js".

### Finally
If you are having troubles somewhere, have a look into the running example at:
[tobkle/create-graphql-server branch: Relay-Pagination](https://github.com/tobkle/create-graphql-server/tree/Relay-Pagination)

## Documentation
[API Documentation](https://tobkle.github.io/create-graphql-server-connections/)

## Tests
TODO:
```bash
yarn test
```

## Contributing
In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.
