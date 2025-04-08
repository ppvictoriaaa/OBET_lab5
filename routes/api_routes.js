const { Router } = require("express");
const controller = require("../controllers/postController");
const router = Router();

router.post("/createNewPost", controller.createPost);
router.post("/updatePost/:id", controller.updatePost);
router.post("/deletePost/:id", controller.deletePost);
router.get("/watchJSON/:id", controller.watchJSON);

module.exports = router;
