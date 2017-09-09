/* eslint-disable no-unused-vars */

const resolvers = {
  PageInfo: {
    hasPreviousPage(pageInfo, args, { PageInfo, me }) {
      return pageInfo.hasPreviousPage;
    },

    hasNextPage(pageInfo, args, { PageInfo, me }) {
      return pageInfo.hasNextPage;
    }
  }
};

export default resolvers;
