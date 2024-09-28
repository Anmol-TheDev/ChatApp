import mongoose, { Schema } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    friendList: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
