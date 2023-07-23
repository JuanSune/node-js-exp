const express = require('express');
const rota = express.Router();
const moongoseUser = require('mongoose');
require('../models/Usuario')

const user = moongoseUser.model('User');

rota.get("/registro", (req, res) => {
    res.render("usuario/registro")
})

rota.post("/registro", (req, res) => {

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || 
        req.body.nome == null){
            erros.push({texto: "Nome invalido"})
    }

    if(!req.body.email || typeof req.body.email == undefined || 
        req.body.email == null){
            erros.push({texto: "E-mail invalido"})

    }

    if(!req.body.senha || typeof req.body.senha == undefined || 
        req.body.senha == null){
            erros.push({texto: "Senha invalida"})

    }

    if(req.body.senha.length < 4){ 
        erros.push({texto: "Senha muito curta"})
    }

    if(req.body.senha != req.body.senha2){ 
        erros.push({texto: "As senhas sao diferentes"})
    }

    if(erros.length > 0){
        res.render("usuario/registro", {erros: erros})
    }else{
        //proxima aula
    }
    
       

    
})

module.exports = rota;