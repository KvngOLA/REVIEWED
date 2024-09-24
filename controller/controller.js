const dotenv = require("dotenv");
dotenv.config();

const userModel = require("../model/model");
const bcrypt = require("bcrypt");
const cloudinary = require("../cloudinary/cloudinary");
const sessionModel = require("../model/session");
const { sendMail, message } = require("../mailer/mailer");

const homePage = (req, res) => {
  res.status(200).send("Home Page✅");
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ message: users });
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: err.message });
  }
};

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const file = req.file.path;
  const upload = await cloudinary.v2.uploader.upload(file);
  try {
    const newUser = await userModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      role,
      picture: upload.secure_url,
    });
    await sendMail(message);
    return res.status(200).json({ newUser: newUser });
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: err.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    await sessionModel.deleteOne({ "session.user.id": user._id.toString });
    return res.status(200).json({ message: "User logged in", user });
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: err.message });
  }
};

const userProfile = async (req, res) => {
  try {
    const id = req.user.id;

    const user = await userModel.findById(id);

    return res.status(200).json({ message: `${user.name} Profile`, user });
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: err.message });
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: err.message });
  }
};

const getUserbyName = async (req, res) => {
  const name = req.params.name;
  try {
    const user = await userModel.findOne({ name });
    if (!user) {
      return res
        .status(404)
        .json({ error: `The user with name ${name} does not exist` });
    } else {
      return res.status(200).json({ user });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: err.message });
  }
};

const deleteUser = async (req, res) => {
  const name = req.params.name;
  try {
    const user = await userModel.findOne({ name });
    if (!user) {
      return res
        .status(404)
        .json({ error: `The user with name ${name} does not exist` });
    } else {
      await userModel.deleteOne(user);
      res.status(200).json({
        message: `The user with the name ${name} has been succesfully deleted`,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const name = req.params.name;
    const { email, password, role } = req.body;
    const file = req.file.path;
    const upload = await cloudinary.v2.uploader.upload(file);

    const user = await userModel.findOne({ name });
    if (!user) {
      return res
        .status(404)
        .json({ message: `The user with the name ${name} doesnot exist` });
    }
    const updateUser = await userModel.findOneAndUpdate(
      { name },
      {
        email,
        password: await bcrypt.hash(password, 10),
        role,
        picture: upload.secure_url,
      }
    );
    res.status(200).json({ message: "successfully updated", updateUser });
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: err.message });
  }
};

const adminOnly = async (req, res) => {
  return res.status(200).json({ message: "I am an Admin" });
};

module.exports = {
  homePage,
  getAllUsers,
  createUser,
  getUserbyName,
  deleteUser,
  userLogin,
  userProfile,
  updateUser,
  logout,
  adminOnly,
};
