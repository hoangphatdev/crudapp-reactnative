import express from "express";
const router = express.Router();

router.post("/users", async (req, res) => {
  try {
    const { username, email, password, image } = req.body;
    if (!image) return res.status(400).json({ message: "Thiếu ảnh" });

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
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
});
