'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _context = require('./context');

Object.defineProperty(exports, 'getPaginationContext', {
  enumerable: true,
  get: function get() {
    return _context.getPaginationContext;
  }
});

var _schema = require('./schema');

Object.defineProperty(exports, 'enhanceSchemaWithConnections', {
  enumerable: true,
  get: function get() {
    return _schema.enhanceSchemaWithConnections;
  }
});

var _resolvers = require('./resolvers');

Object.defineProperty(exports, 'connectionResolvers', {
  enumerable: true,
  get: function get() {
    return _resolvers.connectionResolvers;
  }
});

var _server = require('./server');

Object.defineProperty(exports, 'paginate', {
  enumerable: true,
  get: function get() {
    return _server.paginate;
  }
});


/**
 * to find this path from various places, return this modules absolute path: 
 */

var modulePath = exports.modulePath = __dirname;

/** 
 * partial templates for pagination in model and resolver codes are here 
 */

var dev_templates = exports.dev_templates = {
  model: [__dirname, '..', 'templates', 'model'],
  resolvers: [__dirname, '..', 'templates', 'resolvers'],
  schema: [__dirname, '..', 'templates', 'schema']
};

var templates = exports.templates = {
  model: [__dirname, 'templates', 'model'],
  resolvers: [__dirname, 'templates', 'resolvers'],
  schema: [__dirname, 'templates', 'schema']
};