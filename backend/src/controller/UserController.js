import cloudinary from "cloudinary";
import UserModel from "../model/User.js";

export const createUserWithoutImage = async (req, res) => {
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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Not found account" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password" });
    }

    res.json({
      message: "Login successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        imageUrl: user.imageUrl,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteOneUser = async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Delete successfully" });
};
