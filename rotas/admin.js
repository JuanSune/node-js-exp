const expressADMIN = require('express');

const routerAll = expressADMIN.Router();


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


module.exports = routerAll;