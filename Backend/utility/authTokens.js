import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
  path: "./.env",
});
const ACCESS_TOKEN_SECRET = "AJbcvsaiugAsdfougar";
const ACCESS_TOKEN_EXPIRY = "1d";
const REFRESH_TOKEN_SECRET = "ASdkfghcvjkfaghsvjkfgh";
const REFRESH_TOKEN_EXPIRY = "10d";

const generateRefreshToken = () => {
  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};
const generateAccessToken = () => {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullName: this.fullName,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
};

export { generateRefreshToken, generateAccessToken };
