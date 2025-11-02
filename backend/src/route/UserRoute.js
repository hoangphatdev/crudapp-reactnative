import express from "express";
import {
  login,
  signup,
  createUserWithImage,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controller/UserController.js";
const route = express.Router();

route.route("/signup/").post(signup);
route.post("/login", login);

route.route("/users").get(getUsers).post(createUserWithImage);
route.route("/users/:id").delete(deleteUser).put(updateUser);

route.route("/user").post(getUser);

export default route;
