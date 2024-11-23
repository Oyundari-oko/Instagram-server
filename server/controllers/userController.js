const userModel = require("../models/userSchema");
const bcrypt = require("bcrypt");
const signUpUser = async (req, res) => {
  try {
    const { username, password, email, profileImg } = req.body;
    console.log(req.body);
    const response = await userModel.create({
      username,
      password,
      email,
      profileImg,
    });
    // console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
  //   const hashPass = bcrypt.hash(password, 5);
};
module.exports = signUpUser;
