const express = require("express");
const router = express.Router();

const {
  getUserById,
  getUser,
  getAllUser,
  updateUser,
  userPostList,
} = require("../controllers/user");

//auth controler for middlewares
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
//?PARAM route
router.param("userId", getUserById);

//?READ routes onlyAdmin
router.get("/alluser/:userId", isSignedIn, isAuthenticated, isAdmin, getAllUser);

//?READ routes
router.get("/user/:userId", getUser);

//?get user post list
router.get("/user/post/:userId", isSignedIn, isAuthenticated, userPostList);

//?UPDATE route
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);

module.exports = router;
