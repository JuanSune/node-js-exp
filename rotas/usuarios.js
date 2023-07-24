const express = require("express");
const rota = express.Router();
const mongooseModule = require("mongoose");
require("../models/Usuario");

const userDaqui = mongooseModule.model("User");

const bcrypt = require("bcryptjs");

const passport = require("passport");

rota.get("/registro", (req, res) => {
  res.render("usuario/registro");
});

rota.get("/login", (req, res) => {
  res.render("usuario/login");
});

rota.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/usuarios/login",
    failureFlash: true,
  })(req, res, next);
});

rota.post("/registro", (req, res) => {
  var erros = [];

  if (
    !req.body.nome ||
    typeof req.body.nome == undefined ||
    req.body.nome == null
  ) {
    erros.push({ texto: "Nome invalido" });
  }

  if (
    !req.body.email ||
    typeof req.body.email == undefined ||
    req.body.email == null
  ) {
    erros.push({ texto: "E-mail invalido" });
  }

  if (
    !req.body.senha ||
    typeof req.body.senha == undefined ||
    req.body.senha == null
  ) {
    erros.push({ texto: "Senha invalida" });
  }

  if (req.body.senha.length < 4) {
    erros.push({ texto: "Senha muito curta" });
  }

  if (req.body.senha != req.body.senha2) {
    erros.push({ texto: "As senhas sao diferentes" });
  }

  if (erros.length > 0) {
    res.render("usuario/registro", { erros: erros });
  } else {
    //proxima aula
    userDaqui.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        //msg_sucesso
        req.flash("msg_erro", "Já existe essa conta com esse email no sistema");
        res.redirect("/usuarios/registro");
      } else {
        const NovoUser = new userDaqui({
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha,
        });

        bcrypt.genSalt(10, (erro, salt) => {
          bcrypt.hash(NovoUser.senha, salt, (erro, valor) => {
            NovoUser.senha = valor;
            NovoUser.save()
              .then(() => {
                req.flash("msg_sucesso", "Deu certo porra");
                res.redirect("/");
              })
              .catch((err) => {
                req.flash("msg_erro", "Deu ERRADO porra");
                res.redirect("/");
              });
          });
        });
      }
    });
  }
});

rota.get("/logout", (req, res) => {
  req.logOut((err) => {
    req.flash("msg_sucesso", "Voce deslogou !");
    res.redirect("/");
  });
});

module.exports = rota;
