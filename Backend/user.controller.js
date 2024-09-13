import User from "./user.model";

const userSignup = async (req, res) => {
  const user = new User(req.body);
  try {
    const { name, email, password } = req.body;
    const newUser = new User.findOne({ email: email });
    if (newUser) {
      throw new Error("User already exists");
    }
    const user = await User.create({ name, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (error) {
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
    res.status(400).send(error);
  }
};

export { userSignup, userLogin };
