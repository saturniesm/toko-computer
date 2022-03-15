//import library
const express = require("express");
const bodyParser = require("body-parser");
const md5 = require("md5")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const model = require("../models/index");
const admin = model.admin;

const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "BelajarNodeJSItuMenyengankan"

app.post("/auth", async (req,res) => {
    let params = {
        username: req.body.username,
        password: md5(req.body.password)
    }
    let result = await admin.findOne({where: params})
    if(result){
        let payload = JSON.stringify(result)
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

app.get("/", auth, (req,res) => {
    admin.findAll()
        .then(result => {
            res.json({
                admin : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk menyimpan data admin, METHOD: POST, function: create
app.post("/", (req, res) => {
  let data = {
    name: req.body.name,
    username: req.body.username,
    password: md5(req.body.password),
  };

  admin
    .create(data)
    .then((result) => {
      res.json({
        message: "data has been inserted",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint mengupdate data admin, METHOD: PUT, function:update
app.put("/:id", (req, res) => {
  let param = {
    admin_id: req.params.id,
  };
  let data = {
    name: req.body.name,
    username: req.body.username,
    password: md5(req.body.password),
  };
  admin
    .update(data, { where: param })
    .then((result) => {
      res.json({
        message: "data has been updated",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

//endpoint menghapus data admin, METHOD: DELETE, function: destroy
app.delete("/:id", (req, res) => {
  let param = {
    admin_id: req.params.id,
  };
  admin
    .destroy({ where: param })
    .then((result) => {
      res.json({
        message: "data has been deleted",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

module.exports = app;

