const User = require("../Models/user.model");

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

module.exports = {
    verifySignIn,
    verifySignUp
}