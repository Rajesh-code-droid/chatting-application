const User = require("../model/userModel");
const brcypt = require("bcrypt");
const { findOne } = require("../model/userModel");
// register
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ msg: "User name already Used", status: false });
    }
    const emaiCheck = await User.findOne({ email });
    if (emaiCheck) {
      return res.json({ msg: "Email already Used", status: false });
    }
    const hassesPassword = await brcypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hassesPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
// Login
module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.json({ msg: "Incorrect username or Password", status: false });
    }
    const isPasswordValid = await brcypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Incorrect username or Password", status: false });
    }
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};
// Set Avatar
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

// Get all Users
module.exports.getAllUsers = async (req, res, next) => {
  try{

  }catch(ex){
    next(ex);
  }
}