const express = require('express');
const rota = express.Router();
const moongoseUser = require('mongoose');
require('../models/Usuario')

const user = moongoseUser.model('User');

rota.get("/registro", (req, res) => {
    res.render("usuario/registro")
})


module.exports = rota;