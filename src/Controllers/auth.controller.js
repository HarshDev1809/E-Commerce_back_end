const User = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../configs/auth.configs");

exports.signUp = async(req,res) => {
  const { userName, passWord, emailId, name } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(passWord, 10);
    const token = jwt.sign({ userName: userName }, SECRET, { expiresIn: "1h" });
    const newUser = new User({
      userName: userName,
      passWord: hashedPassword,
      name: name,
      emailId: emailId,
    });

    await newUser.save();

    const response = {
        accessToken : token,
        userName : userName,
        name : name
    };
    return res.status(201).send(response);}
    catch (err) {
        console.log(err);
        return res.status(500).send({message : "Something Went Wrong!"});
      }
};

exports.signIn = async(req,res) => {
    const { userName, passWord } = req.body;
  try {
    const user = await User.findOne({
      userName: userName,
    });

    if (!user) {
      return res.status(400).send({ message: "Invalid UserName or PassWord!"});
    } else {
      const isValid = bcrypt.compareSync(passWord, user.passWord);
      if (isValid) {
        const token = jwt.sign({ userName: user.userName }, SECRET, {
          expiresIn: "1h",
        });
        const response = {
          userName: user.userName,
          name: user.name,
          accessToken: token,
        };
        return res.status(200).send(response);
      } else {
        return res.status(400).send({ message: "Invalid UserName or PassWord!" });
      }
    }
  } catch (err) {
    return res.status(500).send({message : "Something Went Wrong!"});
  }
};
