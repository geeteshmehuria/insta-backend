//user controllers
const { UserModule } = require("../model/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BlackListToken } = require("../model/blackListModel");

const registerUser = async (req, res) => {
  const { username, email, password, city, age, gender } = req.body;
  try {
    const existingUser = await UserModule.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ msg: "Email is already in use" });
    }
    bcrypt.hash(password, 8, async (err, hash) => {
      if (err) {
        res.send({ error: err });
      } else {
        const user = new UserModule({
          username,
          email,
          password: hash,
          city,
          age,
          gender,
        });
        await user.save();
        res.status(200).send({ message: "User created successfully!" });
      }
    });
  } catch (error) {
    console.log(`Error at registration ${error}`);
    res.status(500).send({ error: `Error at registration ${error}` });
  }
};

//user login with the help or this function
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModule.findOne({ email });
    // console.log(">>>>",user)
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { userId: user._id },
          "masai",
          { expiresIn: "7d" }
        );
        res.status(200).send({ msg: "Login successful", token: token });
      } else {
        res.status(400).send({ msg: "Invalid Email or Password", error: err });
      }
    });
  } catch (error) {
    console.log(`Error at Login ${error}`);
    res.status(500).send({ msg: `Error at Login ${error}` });
  }
};

const logoutUser = async (req, res) => {
  const blackListToken = req.headers.authorization?.split(" ")[1];

  try {
    const Token = await BlackListToken.findOne({ blackListToken });
    if (Token) {
      return res
        .status(400)
        .json({ msg: "You are already logged out. Login again" });
    } else {
      const blacklist = new BlackListToken({ blackListToken });
      await blacklist.save();
      return res.status(200).send({ msg: "User logout successfully" });
    }
  } catch (error) {
    return res.status(500).send({ msg: "internal server error", error: error });
  }
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
