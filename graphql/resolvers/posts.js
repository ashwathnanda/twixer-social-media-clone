const Posts = require("../../models/Posts");

const postResolver = {
  Query: {
    async getPosts() {
      try {
        return await Posts.find();
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

module.exports = postResolver;