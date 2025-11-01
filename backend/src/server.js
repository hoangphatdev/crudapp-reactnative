import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cloudinary from "cloudinary";
import connectDB from "./config/db.js";
import UserRoute from "./route/UserRoute.js";

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

app.use("/api/", UserRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
