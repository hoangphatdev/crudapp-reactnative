import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

dotenv.config(); // luôn đặt TRƯỚC khi dùng biến môi trường

const app = express();
connectDB();

// cấu hình Cloudinary sau khi dotenv đã load
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// xác thực nhanh Cloudinary để debug (nên xóa sau khi ổn định)
cloudinary.v2.api
  .ping()
  .then(() => console.log("✅ Cloudinary connected"))
  .catch((err) => console.error("❌ Cloudinary error:", err));

app.use(cors());
app.use(express.json({ limit: "25mb" })); // tăng limit để nhận base64 lớn

// Schema và Model
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  imageUrl: String,
});
const User = mongoose.model("User", UserSchema);

// Route tạo user
app.post("/users", async (req, res) => {
  try {
    const { username, email, password, image } = req.body;
    if (!username || !email || !password || !image) {
      return res.status(400).json({ message: "Thiếu dữ liệu" });
    }

    // upload ảnh base64
    const uploadRes = await cloudinary.v2.uploader.upload(
      `data:image/jpeg;base64,${image}`,
      { folder: "users" }
    );

    const newUser = await User.create({
      username,
      email,
      password,
      imageUrl: uploadRes.secure_url,
    });

    res.json({ message: "Tạo user thành công", user: newUser });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({
      message: "Lỗi server",
      error: err.message,
    });
  }
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Đã xóa user" });
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Sai mật khẩu" });
    }

    res.json({
      message: "Đăng nhập thành công",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        imageUrl: user.imageUrl,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
