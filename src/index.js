// @flow

/**
 * CREATE-GRAPHQL-SERVER-CONNECTIONS
 *
 * Provides Relay like cursor-based Pagination to create-graphql-server
 * Use the header directive to activate:
 * 
 *        @paginate(by: "cursor")
 *
 * @module CREATE-GRAPHQL-SERVER-CONNECTIONS
 */

/**
 * provides the pagination context for getContext.js 
 */

export { getPaginationContext } from './context';

/** 
 * enhances the schema by additional or altered types 
 */

export { enhanceSchemaWithConnections } from './schema';

export { connectionResolvers } from './resolvers';

/** 
 * provides the pagination logic to server/index.js into the model context
 */

export { paginate } from './server';

/**
 * to find this path from various places, return this modules absolute path: 
 */

export const modulePath = __dirname;

/** 
 * partial templates for pagination in model and resolver codes are here 
 */

export const templates = {
  model: [__dirname, '..', 'templates', 'model'],
  resolvers: [__dirname, '..', 'templates', 'resolvers'],
  schema: [__dirname, '..', 'templates', 'schema']
};
