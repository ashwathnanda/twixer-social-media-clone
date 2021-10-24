const postResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolver = require("./comments");
const likesResolver = require("./likes");

module.exports = {
  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolver.Mutation,
    ...likesResolver.Mutation,
  },
};
