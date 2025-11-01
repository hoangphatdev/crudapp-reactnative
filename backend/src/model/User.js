import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  imageUrl: String,
});
const Model = mongoose.model("User", UserSchema);
export default Model;
