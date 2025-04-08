const express = require("express");
const router = express.Router();
const controller = require("../controllers/postController");

router.get("/", (req, res) => {
  res.render("home");
});

router.get("/newPost", (req, res) => {
  res.render("newPost");
});

router.get("/getAllPosts", controller.getAllPosts);

router.get("/editPost/:id", controller.getPostById);

module.exports = router;
