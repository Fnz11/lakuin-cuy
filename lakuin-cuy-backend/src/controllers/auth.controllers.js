const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { ObjectId } = require("mongodb");
const {
  getUserWEmailService,
  getUserWUsernameService,
  postUserService,
} = require("../services/user.services");
const router = express.Router();

require("dotenv").config();
const jwtkey = process.env.SECRETJWT;

// REGISTER
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Memeriksa apakah email sudah register
    const isExistingUserEmail = await getUserWEmailService(email);
    if (isExistingUserEmail) {
      return res.status(400).json({ msg: "Email udah pernah didaftarkan" });
    }

    // Memeriksa apakah email sudah register
    const isExistingUserUsername = await getUserWUsernameService(username);
    if (isExistingUserUsername) {
      return res.status(400).json({ msg: "Username udah dipake" });
    }

    // Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Membuat data baru dalam DB
    postUserService({ username, email, hashPassword });
    res.status(200).json({ message: "Register berhasil" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Memeriksa apakah ada user atau tidak
    const user = await getUserWEmailService(email);
    // Memeriksa apakah password benar atau tidak
if (!user) {
  return res.status(400).json({ msg: "Email belum terdaftar" });
}

    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({ msg: "Password salah" });
    }

    // Membuat token
    const token = jwt.sign({ _id: user._id }, jwtkey);

    res.status(200).json({ token, username: user.username });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Halaman Login Required Function
const authenticateToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "Access denied" });
  }

  const username = req.params.username;
  const isUserExistence = await getUserWUsernameService(username);
  if (!isUserExistence) {
    return res.status(400).json({ msg: "Halaman tidak ada" });
  }
  // isUserExistence = JSON.parse(isUserExistence);

  jwt.verify(token, jwtkey, (err, user) => {
    if (err) return res.status(401).json({ msg: "Token is not valid" });
    const userId = new ObjectId(user._id);
    if (userId.equals(isUserExistence._id)) {
      req.user = user;
      next();
    } else {
      return res.status(401).json({ msg: "Access denied. Invalid user" });
    }
  });
};

module.exports = {
  router,
  authenticateToken,
};
