const { verifyAndReturnUser } = require("../../helpers/auth");
const Posts = require("../../models/Posts");
const { UserInputError } = require("apollo-server");

const likesResolver = {
  Mutation: {
    async likePosts(_, { postId }, context) {
      const { username } = verifyAndReturnUser(context);
      const post = await Posts.findById(postId);

      if (post) {
        if (post.likes.find((like) => like.username === username)) {
          //user has already liked the post. Unlike it.
          post.likes = post.likes.filter((like) => like.username !== username);
        } else {
          // User has not liked it. Add a new like.
          post.likes.push({
            username: username,
            createdAt: new Date().toISOString(),
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
  },
};

module.exports = likesResolver;
