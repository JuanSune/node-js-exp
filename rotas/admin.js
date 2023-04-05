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
    CategoriaDaqui.find().lean().then(
        (categorias) => {
            res.render("admin/categorias", {categorias: categorias})
        }
    ).catch((err) => {
        req.flash("msg_erro","Houve um erro no carregamento da lista de categorias")
        res.redirect("/admin")
    })
  
});

routerAll.get('/categorias/add',(req,res) => {
    res.render('admin/addCategorias');
});

routerAll.post('/categorias/nova',(req,res) => {

    var errosVar = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        errosVar.push({texto: "Nome invalido"})
    }
    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        errosVar.push({texto: "Slug invalido"})
    }
    if(req.body.nome.length < 2){
        errosVar.push({texto: "Nome da categoria pequeno"})
    }

    if(errosVar.length > 0){
        res.render("admin/addCategorias",{errosHonor:errosVar})
    }
    else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new CategoriaDaqui(novaCategoria).save().then(() => {
            Ca
            req.flash("msg_sucesso","Categoria criada com sucesso!" )
            res.redirect("/admin/categorias");
        }).catch((err) => { 
            req.flash("msg_erro","Categoria nao foi criada" )
            res.redirect("/admin/categorias");
        })

    }

   
});

routerAll.get('/categorias/edit/:id',(req,res) =>{
    CategoriaDaqui.findOne({_id:req.params.id}).lean().then((categoria) => {

        res.render('admin/editCategorias',{categoria:categoria})
    }).catch((err) => {
        req.flash("msg_erro","Esta categoria não exista")
        res.send("/admin/categorias")
    })
    
});

module.exports = routerAll;