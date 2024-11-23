const userModel = require("../models/userSchema");
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
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send("not Signup");
  }
};
module.exports = signUpUser;
