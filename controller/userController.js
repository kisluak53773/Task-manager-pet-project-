const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const errorHandler = require("../error/errorHandler");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const uuid = require("uuid");
const path = require("path");

const generateToken = (id, email, role, img, name) => {
  return jwt.sign({ id, email, role, img, name }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

async function registration(req, res, next) {
  const { name, email, password, phone, role } = req.body;
  var fileName;
  if (req.files) {
    const img = req.files.img;
    fileName = uuid.v4() + ".jpg";
    img.mv(path.resolve(__dirname, "..", "static", fileName));
  } else {
    fileName = "placeholder.jpg";
  }
  if (!email || !password || !name || !phone || !role) {
    return next(errorHandler.badRequest("Required data for user is absent"));
  }
  const possibleUser = await User.findOne({ where: { email } });
  if (possibleUser) {
    return next(errorHandler.badRequest("Such user already exists"));
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    phone,
    role,
    img: fileName,
  });
  const token = generateToken(
    user.id,
    user.email,
    user.role,
    user.img,
    user.name
  );
  return res.json({ token });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(errorHandler.badRequest("Wrong password or email"));
  }
  const token = generateToken(
    user.id,
    user.email,
    user.role,
    user.img,
    user.name
  );
  return res.json({ token });
}

async function auth(req, res) {
  const { id, email, role, img, name } = req.user;
  const token = generateToken(id, email, role, img, name);
  return res.json({ token });
}

async function getAllUsers(req, res, next) {
  try {
    const users = await User.findAll();
    if (users.length === 0) {
      return res.status(204);
    }
    return res.status(200).json(users);
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

module.exports = {
  registration,
  login,
  auth,
  getAllUsers,
};
