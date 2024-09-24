const { message } = require("../mailer/mailer");
const userModel = require("../model/model");

const generateToken = async (req, res, next) => {
  try {
    const email = req.body.email;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "This user does not exist" });
    }
    req.session.newUser = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    };
    next()
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
};

const isAuthenticated = async (req, res, next) => {
  try {
    const session = req.session.newUser;
    if (!session || session == "") {
      return res.status(409).json({ message: "Please sign in" });
    }
    req.user = session;

    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
};

const logout = async (req, res, next) => {
  try {
    const destroySession = req.session.destroy();
    if (!destroySession) {
      return res.status(500).json({ message: "OOPS something went wrong" });
    }
    res.clearCookie("connect.sid");
    next()
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
};

const isSuperAdmin = async (req, res, next) => {
  try {
    console.log(req.user);
    if (req.user.role !== "Admin") {
      return res.status(403).json({ error: "Forbidden" });
    }
    next()
  } catch (err) {
    console.log(err);
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  isAuthenticated,
  generateToken,
  logout,
  isSuperAdmin,
};
