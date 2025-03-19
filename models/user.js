import { Schema, model, modelNames } from "mongoose";
import normalize from "normalize-mongoose";

const userSchema = new Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String },
});

userSchema.plugin(normalize);
export const User = model("User", userSchema);
