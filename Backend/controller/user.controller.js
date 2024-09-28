import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utility/cloudinary.js";
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
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error);
  }
};

export { userSignup, userLogin };
