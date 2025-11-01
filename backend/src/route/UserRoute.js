import express from "express";
import {
  createUserWithoutImage,
  createUserWithImage,
  getUsers,
  login,
  deleteOneUser,
} from "../controller/UserController.js";
const route = express.Router();

route.route("/users").get(getUsers);

route.route("/signup/").post(createUserWithoutImage);

route.post("/login", login);

route.delete("/users/:id", deleteOneUser);
route.post("/users", createUserWithImage );

export default route;
