const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
//const expressValidator = require ('express-validator');
const authen = require("./mongoose");

//const HttpError = require('./models/http-error');
const app = express();

app.use(bodyparser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

//app.use (expressValidator);
app.post("/signup", authen.signup);
app.post("/login", authen.login);
app.post("/gmailLogin", authen.gmailLogin);
app.post("/spell", authen.matchWord);
app.post("/admin/addWord", authen.spellBeeAdmin);
app.get("/word/", authen.getWord);

mongoose
  .connect("mongodb://localhost/PPS", { useNewUrlParser: true })
  .then(() => {
    app.listen(5000);
    console.log("connected successfully");
  })
  .catch(() => {
    console.log("failed to connect");
  });
