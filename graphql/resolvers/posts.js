const Posts = require("../../models/Posts");
const { verifyAndReturnUser } = require("../../helpers/auth");
const { AuthenticationError } = require("apollo-server");

const postResolver = {
  Query: {
    async getPosts() {
      try {
        return await Posts.find().sort({ createdAt: -1 });
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Posts.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPost(_, { body }, context) {
      const user = verifyAndReturnUser(context);

      const newPost = Posts({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      context.pubSub.publish("NEW_POST", {
        newPost: post,
      });

      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = verifyAndReturnUser(context);
      try {
        const post = await Posts.findById(postId);
        if (post.username === user.username) {
          post.delete();
          return "Post Deleted!";
        } else {
          throw new AuthenticationError(
            "You are not authorized to delete this post"
          );
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Subscription: {
    newPost: {
      subscribe: (_, __, { pubSub }) => pubSub.asyncIterator("NEW_POST"),
    },
  },
};

module.exports = postResolver;
