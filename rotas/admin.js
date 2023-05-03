const expressADMIN = require("express");

const routerAll = expressADMIN.Router();

const mongooseModule = require("mongoose");
require("../models/Categoria");

const CategoriaDaqui = mongooseModule.model("categorias");

const ModelPostagem = mongooseModule.model("postagens");

routerAll.get("/", (req, res) => {
  res.render("admin/index");
});

routerAll.get("/posts", (req, res) => {
  res.send("Pagina de posts");
});

routerAll.get("/categorias", (req, res) => {
  CategoriaDaqui.find()
    .lean()
    .then((categorias) => {
      res.render("admin/categorias", { categorias: categorias });
    })
    .catch((err) => {
      req.flash(
        "msg_erro",
        "Houve um erro no carregamento da lista de categorias"
      );
      res.redirect("/admin");
    });
});

routerAll.get("/categorias/add", (req, res) => {
  res.render("admin/addCategorias");
});

routerAll.post("/categorias/nova", (req, res) => {
  var errosVar = [];

  if (
    !req.body.nome ||
    typeof req.body.nome == undefined ||
    req.body.nome == null
  ) {
    errosVar.push({ texto: "Nome invalido" });
  }
  if (
    !req.body.slug ||
    typeof req.body.slug == undefined ||
    req.body.slug == null
  ) {
    errosVar.push({ texto: "Slug invalido" });
  }
  if (req.body.nome.length < 2) {
    errosVar.push({ texto: "Nome da categoria pequeno" });
  }

  if (errosVar.length > 0) {
    res.render("admin/addCategorias", { errosHonor: errosVar });
  } else {
    const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug,
    };

    new CategoriaDaqui(novaCategoria)
      .save()
      .then(() => {
        req.flash("msg_sucesso", "Categoria criada com sucesso!");
        res.redirect("/admin/categorias");
      })
      .catch((err) => {
        req.flash("msg_erro", "Categoria nao foi criada");
        res.redirect("/admin/categorias");
      });
  }
});

routerAll.get("/categorias/edit/:id", (req, res) => {
  CategoriaDaqui.findOne({ _id: req.params.id })
    .lean()
    .then((categoria) => {
      res.render("admin/editCategorias", { categoria: categoria });
    })
    .catch((err) => {
      req.flash("msg_erro", "Esta categoria não existe");
      res.redirect("/admin/categorias");
    });
});

routerAll.post("/categorias/edit/", (req, res) => {
  let filter = { _id: req.body.id };
  let update = { nome: req.body.nome, slug: req.body.slug };

  CategoriaDaqui.findOneAndUpdate(filter, update)
    .then(() => {
      console.log(filter);
      console.log(req.body.nome);

      req.flash("msg_sucesso", "Categoria editada com sucesso!");
      res.redirect("/admin/categorias");
    })
    .catch((err) => {
      req.flash("msg_erro", "Erro ao atualizar categoria");
    });

  // res.send("Seja bem vindo, porque funcionou");
});

routerAll.post("/categorias/deletar/", (req, res) => {
  let filter = { _id: req.body.id };

  CategoriaDaqui.deleteOne(filter)
    .then(() => {
      req.flash("msg_sucesso", "Categoria APAGADA com sucesso!");
      res.redirect("/admin/categorias");
    })
    .catch((err) => {
      req.flash("msg_erro", "Erro ao APAGAR categoria");
      res.redirect("/admin/categorias");
    });
});

routerAll.get("/postagens/", (req, res) => {
  res.render("admin/postagem");
});

routerAll.get("/postagens/add/", (req, res) => {
 
    CategoriaDaqui.find().lean().then((categoria) => {
      res.render("admin/addPostagens",{categorias: categoria});
   })
});

routerAll.post("/postagem/nova", (req, res) => {

  const novaPostagem = {
    titulo: req.body.titulo,
    slug: req.body.slug,
    categoria: req.body.categoria,
    conteudo: req.body.conteudo,
    descricao: req.body.descricao

  }

  new ModelPostagem(novaPostagem)
  .save()
  .then(() => {
    req.flash("msg_sucesso", "POSTAGEM criada com sucesso!");
    res.redirect("/admin/postagens");
  })
  .catch((err) => {
    req.flash("msg_erro", "A POSTAGEM NAO FOI CRIADA COM SUCESSO nao foi criada");
    res.redirect("/admin/postagens");
  });
})

module.exports = routerAll;
