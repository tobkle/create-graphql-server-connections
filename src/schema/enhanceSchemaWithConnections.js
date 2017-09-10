// @flow
import cloneDeep from 'lodash.clonedeep';
import merge from 'lodash.merge';
import { buildTypeReference } from '../util/graphql';
import { addConnectionType } from './libs/addConnectionType';
import { addCursorArgsToQuery } from './libs/addCursorArgsToQuery';
import { addEdges } from './libs/addEdges';
import { addConnections } from './libs/addConnections';
import { getPaginationMode } from './libs/getPaginationMode';
import { isPaginated } from './libs/isPaginated';
import { removePaginateDirective } from './libs/removePaginateDirective';
import { replaceWithCursor } from './libs/replaceWithCursor';

import {
  DOCUMENT,
  OBJECT_TYPE_DEFINITION,
  PAGINATION_SIMPLE,
  PAGINATION_CURSOR,
  PAGINATION_BOTH
} from '../util/constants';

/**
 * returns an enhanced schema with cursor based pagination
 * @public
 * @param {object} schema - the base schema to work with
 * @return {object} enhancedSchema - enhanced schema for cursor based pagination
 */

export function enhanceSchemaWithConnections(schema: any): any {
  let enhancedSchema = cloneDeep(schema);
  let createEdges = {};
  let createConnections = {};
  let TypeName = '';
  let mode = PAGINATION_SIMPLE;

  if (enhancedSchema.kind === DOCUMENT) {
    enhancedSchema.definitions
      .filter(def => def.kind === OBJECT_TYPE_DEFINITION)
      .some(({ fields, name, directives, interfaces }) => {
        TypeName = name.value;

        // add interface "implements Node"
        interfaces.push(buildTypeReference('Node'));

        fields.filter(field => isPaginated(field)).forEach(field => {
          mode = getPaginationMode(directives);

          if (mode === PAGINATION_CURSOR) {
            const toAdd = replaceWithCursor(field, TypeName);
            field.arguments = toAdd.newArgs;
            field.name.value = toAdd.fieldName;
            field.type = toAdd.fieldType;
            createEdges = merge(createEdges, toAdd.createEdges);
            createConnections = merge(
              createConnections,
              toAdd.createConnections
            );
          } else if (mode === PAGINATION_BOTH) {
            const toAdd = addConnectionType(field, TypeName);
            fields.push(toAdd.newField);
            createEdges = merge(createEdges, toAdd.createEdges);
            createConnections = merge(
              createConnections,
              toAdd.createConnections
            );
          }
        });
        return true; // end after first match, first ObjectType is our type
      });

    // add cursor arguments to the Query extend
    if (mode === PAGINATION_CURSOR || mode === PAGINATION_BOTH) {
      enhancedSchema = addCursorArgsToQuery(enhancedSchema, mode);
    }

    // finally add the edgeTypes and connectionTypes, but only once
    enhancedSchema = addEdges(enhancedSchema, createEdges);
    enhancedSchema = addConnections(enhancedSchema, createConnections);
    enhancedSchema = removePaginateDirective(enhancedSchema);
  }

  return enhancedSchema;
}
