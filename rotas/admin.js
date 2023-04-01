const expressADMIN = require('express');

const routerAll = expressADMIN.Router();

const mongooseModule = require('mongoose');
require('../models/Categoria');

const CategoriaDaqui = mongooseModule.model('categorias');

routerAll.get('/',(req,res) => {
    res.render("admin/index");
});

routerAll.get('/posts',(req,res) => {
    res.send("Pagina de posts");
});

routerAll.get('/categorias',(req,res) => {
    res.render("admin/categorias");
});

routerAll.get('/categorias/add',(req,res) => {
    res.render('admin/addCategorias');
});

routerAll.post('/categorias/nova',(req,res) => {
    const novaCategoria = {
        nome: req.body.nome,
        slug: req.body.slug
    }

    new CategoriaDaqui(novaCategoria).save().then(() => {
        console.log('Ocorreu tudo bem, a categoria foi salva')
    }).catch((err) => { 
        console.log('Aconteceu o seguinte erro: '+err)
    })
});

module.exports = routerAll;