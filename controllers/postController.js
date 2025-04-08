const Post = require("../models/posts");
const moment = require("moment");
const mongoose = require("mongoose");

exports.createPost = async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      author: req.body.author,
      text: req.body.text,
    });
    await newPost.save();
    res.redirect("/getAllPosts");
    console.log(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    posts.forEach((post) => {
      const createdAt = new Date(post.createdAt);
      const updatedAt = new Date(post.updatedAt);
      const now = new Date();

      const diffTimeCreated = now - createdAt;
      if (diffTimeCreated < 30 * 24 * 60 * 60 * 1000) {
        post.formattedCreatedAt = moment(createdAt).format("DD.MM HH:mm");
      } else if (diffTimeCreated > 365 * 24 * 60 * 60 * 1000) {
        post.formattedCreatedAt = moment(createdAt).format("DD.MM.YYYY");
      } else {
        post.formattedCreatedAt = moment(createdAt).format("DD.MM.YYYY");
      }

      const diffTimeUpdated = now - updatedAt;
      if (diffTimeUpdated < 30 * 24 * 60 * 60 * 1000) {
        post.formattedUpdatedAt = moment(updatedAt).format("DD.MM HH:mm");
      } else if (diffTimeUpdated > 365 * 24 * 60 * 60 * 1000) {
        post.formattedUpdatedAt = moment(updatedAt).format("DD.MM.YYYY");
      } else {
        post.formattedUpdatedAt = moment(updatedAt).format("DD.MM.YYYY");
      }
    });

    res.render("allPosts", { posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render("editPost", { post });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        updatedAt: new Date(),
      },
      { new: true }
    );
    res.redirect("/getAllPosts");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect("/getAllPosts");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.watchJSON = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.send(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
