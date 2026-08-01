const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "All Fileds Are Required",
        errors: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }
    const { firstName, lastName, email, password, phoneNumber } = req.query;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phoneNumber,
    });
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error occured", error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message:"Validation Error",
            errors:errors.array().map((err)=>err.msg).join(", ")
        })
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User Doesnt exist.Please Register" });
    }
    if (user.status !== "active") {
      return res
        .status(403)
        .json({ message: "User Account Temporarily Blocked!!" });
    }

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    user.lastLogin = new Date();
    await user.save();
    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2hr" },
    );
    res
      .status(201)
      .json({
        message: "LoggedIn Successfully",
        user: {
          userId: user._id,
          email,
          role: user.role,
          lastLogin: user.lastLogin,
        },
        accessToken,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error occured", error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const usersList = await User.find();
    res.status(200).json({ message: "Users List", data: usersList });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error occured", error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "All Fileds Are Required",
        errors: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      role,
      profilePhoto,
      status,
    } = req.query;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      phoneNumber,
      role,
      status,
      profilePhoto,
    });
    res
      .status(201)
      .json({ message: "User Created Successfully", data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error occured", error: error.message });
  }
};

const getProflie = async (req, res) => {
  try {
    const { id } = req.params;
    const getUser = await User.findOne({ _id: id });
    res
      .status(200)
      .json({ message: "Get User Profile Details", data: getUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error occured", error: error.message });
  }
};
const changePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation Error",
        errors: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }
    const { userId, currentPassword, newPassword } = req.query;
    const user = await User.findOne({ _id: userId });
    const checkCurrentPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    );
    if (!checkCurrentPassword) {
      return res.status(400).json({ message: "Please Enter Correct Password" });
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    const updatePassword = await User.findByIdAndUpdate(
      userId,
      { password: hashPassword },
      { new: true },
    );
    res.status(201).json({ message: "Password Updated Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error occured", error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "All Fields Are Required",
        errors: errors
          .array()
          .map((err) => err.msg)
          .join(", "),
      });
    }
    const {
      userId,
      id,
      firstName,
      lastName,
      email,
      phoneNumber,
      role,
      profilePhoto,
      status,
    } = req.query;
    var userDetails = null;
    //admin updating the user details
    if (id) {
      const userData = await User.findOne({ _id: id });
      var userDetails = await User.findByIdAndUpdate(
        userId,
        { firstName, lastName, email, phoneNumber, role, profilePhoto, status },
        { new: true, runValidators: true },
      );
    }
    // console.log(userData);
     //admin or user itself updating the details
    const requestedUser = await User.findOne({ _id: userId });
    if (!requestedUser) {
      return res.status(403).json({ message: "User Not Found!!" });
    }

    var userDetails = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, phoneNumber, profilePhoto },
      { new: true, runValidators: true },
    );

    if (!userDetails) {
      return res.status(401).json({ message: "User Data Missing!!" });
    }

    res
      .status(200)
      .json({ message: "User Updated Successfully", data: userDetails });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error occured", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;  
    const deleteProfile = await User.findByIdAndDelete({ _id: id});
    res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error occured", error: error.message });
  }
};
module.exports = {
  register,
  login,
  getUsers,
  createUser,
  updateUser,
  changePassword,
  getProflie,
  deleteUser,
};
