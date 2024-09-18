import { User } from "./user.model.js";

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = {
      name,
      email,
      password,
    };
    // const newUser = new User.findOne({ email: email });
    // if (newUser) {
    //   throw new Error("User already exists");
    // }
    // const user = await User.create({ name, email, password });
    // await user.save();
    console.log(user)
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
