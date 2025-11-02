import cloudinary from "cloudinary";
import UserModel from "../model/User.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      console.log("Error: login");
      return res.status(404).json({ message: "Not found account" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.status(200).json({
      message: "Login successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        password: user.password,
        imageUrl: user.imageUrl,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json("Missing information...");
    }
    const newUser = await UserModel.insertOne({ username, email, password });
    console.log("Create user successfully: ", newUser);
    return res
      .status(200)
      .json({ message: "Create user successfully", user: newUser });
  } catch (err) {
    console.log("Error: ", err);
    return res.status(444).json(err);
  }
};

export const createUserWithImage = async (req, res) => {
  try {
    const { username, email, password, image } = req.body;
    if (!username || !email || !password || !image) {
      return res.status(400).json({ message: "Missing information" });
    }

    const uploadRes = await cloudinary.v2.uploader.upload(
      `data:image/jpeg;base64,${image}`,
      { folder: "users" }
    );

    const newUser = await UserModel.create({
      username,
      email,
      password,
      imageUrl: uploadRes.secure_url,
    });

    res.json({ message: "Create user successfully", user: newUser });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

export const getUsers = async (req, res) => {
  const users = await UserModel.find();
  return res.json(users);
};

export const getUser = async (req, res) => {
  try {
    const { email } = await req.body;
    const user = await UserModel.findOne({ email: email });
    res.status(200).json(user);
  } catch (err) {
    console.log("getUser error: ", err);
    return res.status(403).json({ message: `Server error: ${err}` });
  }
};

export const deleteUser = async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Delete successfully" });
};

export const updateUser = async (req, res) => {
  try {
    const updateData = {};

    const existingUser = UserModel.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.status(400).json({ message: "Not found user to update." });
    }

    if (req.body.username) {
      updateData.username = req.body.username;
    }
    if (req.body.password) {
      updateData.password = req.body.password;
    }
    if (req.body.imageUrl) {
      updateData.imageUrl = await cloudinary.v2.uploader.upload(
        `data:image/jpeg;base64,${req.body.imageUrl}`,
        { folder: "users" }
      );
    }

    const updatedUser = await UserModel.findOneAndUpdate(
      existingUser,
      updateData,
      { new: true }
    );
    // const updateUser = await UserModel.updateOne(
    //   { email: email },
    //   { username: username, email: email }
    // );
    console.log("Updated user: ", updatedUser);
    return res.status(200).json({ message: "Updated user successfully" });
  } catch (err) {
    console.log("Error from updateUser function: ", err);
    return res.status(404).json({ message: "Server error" });
  }
};
