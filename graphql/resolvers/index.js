const postResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolver = require("./comments");
const likesResolver = require("./likes");

module.exports = {
  // Modifier that will execute everytime Post is returned.
  Posts: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },

  Query: {
    ...postResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentsResolver.Mutation,
    ...likesResolver.Mutation,
  },
  Subscription: {
    ...postResolvers.Subscription,
  },
};
