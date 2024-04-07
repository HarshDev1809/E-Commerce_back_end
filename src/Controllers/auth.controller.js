const User = require("../Models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../configs/auth.configs");
const Admin = require("../Models/admin.model");

exports.signUp = async (req, res) => {
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
      accessToken: token,
      userName: userName,
      name: name,
    };
    return res.status(201).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Something Went Wrong!" });
  }
};

exports.signIn = async (req, res) => {
  const { userName, passWord } = req.body;
  try {
    const user = await User.findOne({
      userName: userName,
    });

    if (!user) {
      return res.status(400).send({ message: "Invalid UserName or PassWord!" });
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
        return res
          .status(400)
          .send({ message: "Invalid UserName or PassWord!" });
      }
    }
  } catch (err) {
    return res.status(500).send({ message: "Something Went Wrong!" });
  }
};

exports.adminSignIn = async (req, res) => {
  const { adminId, passWord } = req.body;
  try {
    const user = await Admin.findOne({
      adminId: adminId,
    });

    if (!user) {
      return res.status(400).send({ message: "Admin Not Found!" });
    } else {
      const isValid = bcrypt.compareSync(passWord, user.passWord);
      if (isValid) {
        const token = jwt.sign({ adminId: user.adminId }, SECRET, {
          expiresIn: "1h",
        });
        const response = {
          userName: user.userName,
          name: user.name,
          adminId: adminId,
          accessToken: token,
        };
        return res.status(200).send(response);
      } else {
        return res
          .status(400)
          .send({ message: "Invalid UserName or PassWord!" });
      }
    }
  } catch (err) {
    return res.status(500).send({ message: "Something Went Wrong!" });
  }
};

exports.adminSignUp = async (req, res) => {
  const { passWord, emailId, name } = req.body;
  const adminId = Date.now();
  try {
    const hashedPassword = bcrypt.hashSync(passWord, 10);
    const token = jwt.sign({ adminId: adminId }, SECRET, { expiresIn: "1h" });
    const newAdmin = new Admin({
      adminId: adminId,
      passWord: hashedPassword,
      name: name,
      emailId: emailId,
    });

    await newAdmin.save();

    const response = {
      accessToken: token,
      adminId: adminId,
      name: name,
    };
    return res.status(201).send(response);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "Something Went Wrong!" });
  }
};

exports.verifyToken = async(req,res)=>{
  const {token} = req.body;
  jwt.verify(token,SECRET,(err,decoded)=>{
    if(err){
      return res.send(false);
    }else{
      return res.status(200).send(true);
    }
  })
}
