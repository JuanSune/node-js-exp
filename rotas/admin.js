const expressADMIN = require('express');

const routerAll = expressADMIN.Router();


routerAll.get('/',(req,res) => {
    res.send("Pagina principal do site");
});

routerAll.get('/posts',(req,res) => {
    res.send("Pagina de posts");
});

routerAll.get('/categorias',(req,res) => {
    res.send("Pagina de categorias");
});

module.exports = routerAll;