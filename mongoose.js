//const express = require("express");

const signupModel = require("./models/signup-models");
const spellModel = require("./models/spell-model");
// const spellBeeModel = require("./models/spellBee-model");

const signup = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  let existingUser;
  try {
    existingUser = await signupModel.findOne({ email: email });
  } catch (err) {
    return res.status(500).send("Logging in failed, please try again later");
  }
  if (existingUser) {
    return res.status(422).send({ err: "user exists already", status: "422" });
  }

  if (!existingUser) {
    const createdUser = new signupModel({
      name,
      email,
      password,
      role,
    });

    const result = await createdUser.save();

    res.status(201).json({ result });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let users;
  try {
    users = await signupModel.findOne({ email: email });
  } catch (err) {
    return res.status(500).send("Logging in failed, please try again later");
  }

  if (!users || users.password !== password) {
    return res.status(401).send({ err: "invalid user input", status: "401" });
  }
  if (email === "admin@gmail.com" && password === "admin123") {
    return res.json({ role: users.role });
  }

  if (users && users.password === password) {
    return res.json({ role: users.role, name: users.name });
  }
};

const gmailLogin = async (req, res, next) => {
  const { email } = req.body;
  let users;
  try {
    users = await signupModel.findOne({ email: email });
  } catch (err) {
    return res.status(500).send("Logging in failed, please try again later");
  }

  if (!users) {
    return res.status(401).send({ err: "invalid user account", status: "401" });
  }
  if (email === "admin@gmail.com") {
    return res.json({ role: users.role });
  }

  if (users) {
    res.json({ role: users.role, name: users.name });
  }
};

const spellBeeAdmin = async (req, res, next) => {
  const { spell, description, grade, level } = req.body;
  let sp;
  try {
    sp = await spellModel.findOne({ spell: spell });
  } catch (err) {
    return res.status(500).send("Logging in failed, please try again later");
  }
  if (sp) {
    return res.status(422).send({ err: "user exists already", status: "422" });
  }

  if (!sp) {
    const createdWord = new spellModel({
      spell,
      description,
      grade,
      level,
    });

    const result = await createdWord.save();

    res.status(201).json({ result: result });
  }
};

const getWord = async (req, res, next) => {
  console.log("responding");
  const query = req.query;
  console.log(" from query " + query.level);
  console.log(" from query grade " + query.grade);
  let text;
  try {
    text = await spellModel.find({}, "spell level grade");
  } catch (err) {
    return res.status(500).send("Logging in failed, please try again later");
  }
  if (!text) {
    return res.status(401).send({ err: "can not match words", status: "401" });
  }
  const level = text
    .filter((l) => l.level === query.level)
    .filter((g) => g.grade === query.grade);
  console.log("from level  " + level);

  if (text) {
    // res.json({ text: text.map((t) => t.toObject({ getters: true })) });
    return res.status(200).send({ text: level.map((t) => t.spell) });
  }
};

const matchWord = async (req, res, next) => {
  const { spell } = req.body;
  let pls;
  try {
    pls = await spellModel.findOne({ spell: spell });
  } catch (err) {
    return res.status(500).send("Logging in failed, please try again later");
  }
  if (!pls) {
    return res.status(401).json({ err: "Spellings do not match" });
  }
  if (pls) {
    return res.json({ spell: pls.spell });
  }
};

exports.signup = signup;
exports.login = login;
exports.gmailLogin = gmailLogin;
exports.spellBeeAdmin = spellBeeAdmin;
exports.matchWord = matchWord;
exports.getWord = getWord;
