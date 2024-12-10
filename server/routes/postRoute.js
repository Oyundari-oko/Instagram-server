const Router = require("express");
const postModel = require("../models/postSchema");
const userModel = require("../models/userSchema");
const comment = require("../controllers/createCommentController");
const commentModel = require("../models/commentSchema");
const post = require("../controllers/postController");
// const like = require("../controllers/likeController");
const userPost = Router();
userPost.post("/post", post);
userPost.post("/post/creat", async (req, res) => {
  const { caption, postImg, userId } = req.body;
  const createPost = await postModel.create({
    caption,
    postImg,
    userId,
  });
  const result = await userModel.findByIdAndUpdate(userId, {
    $push: {
      post: createPost._id,
    },
  });
  res.send(result);
});
userPost.post("/commented/post", comment);

userPost.get("/comments", async (req, res) => {
  const getComment = await commentModel
    .find()
    .populate("userId", "email username _id");
  res.send(getComment);
});

userPost.get("/posts", async (req, res) => {
  const posts = await postModel
    .find()
    .populate("userId", "email username _id")
    .populate({
      path: "liked",
      populate: {
        path: "userId",
        select: "username profileImg",
      },
    });
  res.send(posts);
});

userPost.get("/post/postId", async (req, res) => {
  const { postUserId } = req.query;
  const response = await postModel.find(postUserId).populate({
    path: "comments",
    populate: {
      path: "userId",
      select: "username profileImg",
    },
  });
  res.send(response);
});

userPost.get("/commentsPost", async (req, res) => {
  try {
    const comments = await postModel
      .find()
      .populate("comments", "postUserId comments userId");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = userPost;
