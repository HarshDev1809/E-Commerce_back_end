const { SECRET } = require("../../configs/auth.configs");
const Admin = require("../Models/admin.model");
const User = require("../Models/user.model");
const jwt = require("jsonwebtoken");

const verifySignIn = (req,res,next)=>{
    const { userName, passWord } = req.body;
    if (!userName) {
      return res.status(400).send({message : "USERNAME CAN'T BE EMPTY!"});
    }
  
    if (!passWord) {
      return res.status(400).send({message : "PASSWORD CAN'T BE EMPTY!"});
    }
    next();
}

const verifySignUp = async(req,res,next)=>{
    const { userName, passWord, name, emailId, } =
    req.body;

  if (!userName) {
    return res.status(400).send({
      message: "USERNAME CAN'T BE EMPTY! PLEASE ENTER A VALID USERNAME",
    });
  }

  if (!passWord) {
    return res.status(400).send({
      message: "PASSWORD CAN'T BE EMPTY ! PLEASE ENTER A VALID PASSWORD",
    });
  }

  if (!name) {
    return res
      .status(400)
      .send({ message: "NAME CAN'T BE EMPTY ! PLEASE ENTER YOUR NAME" });
  }

  if (!emailId) {
    return res.status(400).send({
      message: "EMAIL ID CAN'T BE EMPTY ! PLEASE ENTER A VALID EMAIL ID",
    });
  }

  try {
    const user = await User.find({
      $or: [{ userName: userName }, { emailId: emailId }],
    });
    if (user.length) {
      return res
        .status(400)
        .send({ message: "USERNAME OR EMAIL ID ALREADY TAKEN" });
    } else {
      next();
    }
  } catch (err) {
    return res.status(500).send({message : "Something Went Wrong!"});
  }
}

const verifyAdminSignIn = (req,res,next)=>{
  const { adminId, passWord } = req.body;
  if (!adminId) {
    return res.status(400).send({message : "AdminID CAN'T BE EMPTY!"});
  }

  if (!passWord) {
    return res.status(400).send({message : "PASSWORD CAN'T BE EMPTY!"});
  }
  next();
}

const verifyAdminSignUp = async(req,res,next)=>{
  const {passWord, name, emailId } =
    req.body;

  if (!passWord) {
    return res.status(400).send({
      message: "PASSWORD CAN'T BE EMPTY ! PLEASE ENTER A VALID PASSWORD",
    });
  }

  if (!name) {
    return res
      .status(400)
      .send({ message: "NAME CAN'T BE EMPTY ! PLEASE ENTER YOUR NAME" });
  }

  if (!emailId) {
    return res.status(400).send({
      message: "EMAIL ID CAN'T BE EMPTY ! PLEASE ENTER A VALID EMAIL ID",
    });
  }

  try {
    const user = await User.find({
      emailId: emailId
    });
    if (user.length) {
      return res
        .status(400)
        .send({ message: "Admin Already Exist!" });
    } else {
      next();
    }
  } catch (err) {
    return res.status(500).send({message : "Something Went Wrong!"});
  }
}

const verifyAdmin = (req,res,next)=>{
  let token = req.headers['x-access-token']
  if(!token){
    return res.status(403).send({message:"No Token Provided"});
}
  jwt.verify(token,SECRET,async(err,payload)=>{
    if(err){
      return res.status(401).send({message : "Admin not Authenticated!"});
    }

    if(!payload.adminId){
      return res.status(400).send({message : "Not Admin!"});
    }

    const adminId = payload.adminId;
    const admin = await Admin.findOne({adminId : adminId});
    req.admin = admin;
    next();
  })
}

const verifyUser = (req,res,next)=>{
  let token = req.headers['x-access-token']
  if(!token){
    return res.status(403).send({message:"No Token Provided"});
}
  jwt.verify(token,SECRET,async(err,payload)=>{
    if(err){
      return res.status(401).send({message : "Admin not Authenticated!"});
    }

    const userName = payload.userName;
    const user = await User.findOne({userName : userName});
    req.user = user;
    next();
  })
}

module.exports = {
    verifySignIn,
    verifySignUp,
    verifyAdminSignIn,
    verifyAdminSignUp,
    verifyAdmin,
    verifyUser
}