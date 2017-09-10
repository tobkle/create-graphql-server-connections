// @flow

/**
  * Relay like Cursor-based-Paging
  *
  * Use:
  * [<first>] <after>
  * [<last>] <before>
  *
  * Forward Pagination:
  * -------------------
  * first: takes a non-negative integer
  * after: takes the cursor type
  * -------------------
  * returning edges, <after> the cursor, at most <first> edges
  * 
  * Backward Navigation: 
  * --------------------
  * last: takes a non-negative integer
  * before: takes the cursor type
  * --------------------
  * returning edges, <before> the cursor, at most <last> edges
  *
  * Implementing the algorithm according the specification*
  * https://facebook.github.io/relay/graphql/connections.htm#sec-Edges
  * 
  * Pagination Algorithm:
  * ---------------------
  * Rules: <first> and <last> at the same time isn't allowed
  * 
  * 1. Filter by cursor:
  * To determine what edges to return, the connection evaluates
  * <before> or <after> cursors, to filter the edges.
  * 
  * 2. Slice the edges:
  * Evaluate <first> to slice the edges,
  * then evaluate <last> to slice the edges
  */

/**
 * paginates edges cursor-based 
 * according to Relay Cursor Connections Specification
 *
 * @public
 * @param {array} allEdges - array of edges to be paginated
 * @param {object} args - query arguments of the request
 * @return {object} paginatedEdges - remaining edges to show
 * @throw {Error} Error - on wrong pagination combinations
 */

export function paginate(allEdges: Array<any>, args: any): any {
  return {
    edges: edgesToReturn(allEdges, args),
    pageInfo: {
      hasPreviousPage: hasPreviousPage(allEdges, args),
      hasNextPage: hasNextPage(allEdges, args)
    }
  };
}

/**
 * checks the given arguments from a graphql request
 * and checks, if a valid combination of pagination
 * has been entered
 *
 * @public
 * @param {object} args - arguments, coming from graphql request
 * @return {boolean} valid - if pagination arguments are valid
 * @throw {Error} Error - on wrong pagination combination
 */

function checkArguments(args: any): boolean {
  const { skip, limit, first, after, last, before } = args;
  // checks, if a cursor-based navigation is requested
  if (first || after || last || before) {
    if (first && last) {
      throw new Error('Pagination: <first> and <last> can not be combined.');
    }

    if (before && after) {
      throw new Error('Pagination: <before> and <after> can not be combined.');
    }

    if (first && first < 0) {
      throw new Error('Pagination: <first> must be greater 0');
    }

    if (last && last < 0) {
      throw new Error('Pagination: <last> must be greater 0');
    }

    if (skip || limit) {
      throw new Error(`Pagination: <skip>, <limit> can not be combined 
        with cursor-based ([first]/after) or ([last]/before)`);
    }
  }
  return true;
}

/**
 * returns edges processed with first or last
 * @private
 * @param {array} allEdges - edges, to apply first or last onto
 * @param {object} args - arguments from the graphql request
 * @return {array} edges - the resulting edges
 */

function edgesToReturn(allEdges: Array<any>, args: any): Array<any> {
  const { first, after, last, before } = args;

  checkArguments(args);

  let edges = applyCursorsToEdges(allEdges, before, after);

  if (first) {
    if (edges.length > first) {
      edges = edges.slice(0, first);
    }
  }

  if (last) {
    if (edges.length > last) {
      edges = edges.slice(-last);
    }
  }

  return edges.map(edge => ({
    node: edge,
    cursor: edge.createdAt
  }));
}

/**
 * position the array on the before or after cursor
 * @private
 * @param {array} allEdges - edges, to apply first or last onto
 * @param {float} before - contains createdAt (cursor) of a type
 * @param {float} after - contains createdAt (cursor) of a type
 * @return {array} edges - the positioned array of edges
 */

function applyCursorsToEdges(
  allEdges: Array<any>,
  before: number,
  after: number
): Array<any> {
  let edges = allEdges;

  if (after) {
    let cursorIndex = 0;
    let afterEdge = 0;

    allEdges.some((edge, index) => {
      if (edge && edge.createdAt && edge.createdAt === after) {
        cursorIndex = index;
        afterEdge = edge;
        return true;
      }
    });

    if (afterEdge) {
      edges = allEdges.slice(cursorIndex + 1, allEdges.length);
    }
  }

  if (before) {
    let cursorIndex = 0;
    let beforeEdge = 0;

    allEdges.some((edge, index) => {
      if (edge && edge.createdAt && edge.createdAt === before) {
        cursorIndex = index;
        beforeEdge = edge;
        return true;
      }
    });

    if (beforeEdge) {
      edges = allEdges.slice(0, cursorIndex);
    }
  }

  return edges;
}

/**
 * has this page a previous page, if so true
 * @private
 * @param {array} allEdges - edges
 * @param {object} args - the request arguments
 * @return {boolean} prevPage - has a previous page
 */

function hasPreviousPage(allEdges, args) {
  const { last, before, after } = args;

  if (!last) {
    return false;
  }

  const edges = applyCursorsToEdges(allEdges, before, after);

  if (edges.length > last) {
    return true;
  }

  return false;
}

/**
 * has this page a next page, if so true
 * @private
 * @param {array} allEdges - edges
 * @param {object} args - the request arguments
 * @return {boolean} nextPage - has a next page
 */

function hasNextPage(allEdges: any, args: any): boolean {
  const { first, before, after } = args;

  if (!first) {
    return false;
  }

  const edges = applyCursorsToEdges(allEdges, before, after);

  if (edges.length > first) {
    return true;
  }

  return false;
}
