const { verifyAndReturnUser } = require("../../helpers/auth");
const Posts = require("../../models/Posts");
const { UserInputError, AuthenticationError } = require("apollo-server");

const commentsResolver = {
  Mutation: {
    async addComment(_, { postId, body }, context) {
      const user = verifyAndReturnUser(context);
      // Input validation
      //
      if (body.trim() === "") {
        throw new UserInputError("Comment must not be empty.", {
          errors: {
            comment: "Comment body must not be empty",
          },
        });
      }
      const post = await Posts.findById(postId);
      if (post) {
        // Add comment to post and save
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else {
        throw new UserInputError("Post not found");
      }
    },

    //arrow function initialization.
    deleteComment: async (_, { postId, commentId }, context) => {
      const { username } = verifyAndReturnUser(context);
      const post = await Posts.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (post.comments[commentIndex].username === username) {
          //Delete Comment.
          post.comments.splice(commentIndex, 1);
          await post.save();
          return post;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Post not found");
      }
    },
  },
};

module.exports = commentsResolver;
