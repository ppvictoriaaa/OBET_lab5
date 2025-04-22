const Post = require("../models/posts");

const formatPost = (post) => {
  return {
    ...post._doc,
    createdAt: post.createdAt.toLocaleString("uk-UA"),
    updatedAt: post.updatedAt.toLocaleString("uk-UA"),
  };
};

const resolvers = {
  getPost: async ({ id }) => {
    const post = await Post.findById(id);
    return formatPost(post);
  },

  getAllPosts: async () => {
    const posts = await Post.find();
    return posts.map(formatPost);
  },

  createPost: async ({ input }) => {
    const post = new Post(input);
    await post.save();
    return formatPost(post);
  },

  updatePost: async ({ id, input }) => {
    const updated = await Post.findByIdAndUpdate(id, input, { new: true });
    return formatPost(updated);
  },

  deletePost: async ({ id }) => {
    await Post.findByIdAndDelete(id);
    return `Post is deleted successfully.`;
  },
};

module.exports = resolvers;
