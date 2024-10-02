import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utility/cloudinary.js";
import { ApiError } from "../utility/ApiError.js";

import {
  generateRefreshToken,
  generateAccessToken,
} from "../middleware/authTokens.js";
import { ApiResponse } from "../utility/ApiResponse.js";
import { asyncHandler } from "../utility/ayncHandler.js";
const generateTokens = (user) => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);
  if (!accessToken || !refreshToken) {
    throw new ApiError(400, "Failed to generate tokens");
  }
  return { accessToken, refreshToken };
};
const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User.findOne({ email: email });
    if (newUser) {
      throw new Error("User already exists");
    }

    const picturelocalPath = req.files?.profilePicture[0]?.path;
    let coverImageLocalPath;
    if (
      req.files &&
      Array.isArray(req.files.coverImageLocalPath) &&
      req.files.coverImageLocalPath.length > 0 
    ) {
      coverImageLocalPath = req.files.coverImage[0].path;
    }
    if (!(coverImage && picturelocalPath)) {
      throw new Error("Cover image and profile picture are required");
    }

    const avatar = await uploadOnCloudinary(picturelocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    const user = await User.create({
      name,
      email,
      password,
      avatar: avatar.url,
      coverImage: coverImage?.url || "",
    });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    if (!email && !username)
      throw new ApiError(400, "Email and username are required");
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      return res.status(404).send("User not found");
    }
    const isPasswordCorrect = user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
      return res.status(400).send("Password is incorrect");
    }
    const { accessToken, refreshToken } = generateTokens(user);
    res.status(201).send(new ApiResponse(user, accessToken, refreshToken));
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
};
const userLogout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1, // this removes the field from document
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});
const userReferesh = asyncHandler(async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).send("Unauthorized");
  }
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).send("Forbidden");
    }
    const { accessToken } = generateTokens(user);
    res
      .status(200)
      .send(new ApiResponse(user, accessToken, "new Token Generated"));
  });
});
export { userSignup, userLogin, userLogout, userReferesh };
