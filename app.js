// Carregando Modulos

const expressMod = require('express');

const handlebarsMod = require('express-handlebars');

const appMod = expressMod();

const PORT = 8081;

const adminImport = require('./rotas/admin');

const pathMod = require('path');


 const mongooseModule = require("mongoose");

const sessionModule = require("express-session");

const flashModule = require("connect-flash");

require("./models/Postagens")

const PostagemApp = mongooseModule.model("postagens")

const usuarioImport = require('./rotas/usuarios')

const passport = require("passport")




// Configuraçoes


    // Sessao
    appMod.use(sessionModule({
        secret: "cursonode",
        resave: true,
        saveUninitialized: true
    }));

    // Tem que ser depois da sessao e antes do flash
    appMod.use(passport.initialize())
    appMod.use(passport.session())

    appMod.use(flashModule());
    // Middleware
    appMod.use((req, res, next) => {
        res.locals.msg_sucesso = req.flash("msg_sucesso") 
        res.locals.msg_erro = req.flash("msg_erro") 
        res.locals.error = req.flash("error")
        res.locals.user = req.user || null
        next()
    });

    // Body Parser
    appMod.use(expressMod.urlencoded({extended: true}));
    appMod.use(expressMod.json());

    // Handlebars
    appMod.engine('handlebars', handlebarsMod.engine({defaultLayout: 'main'}))
    appMod.set('view engine','handlebars');
    // Mongoose
        mongooseModule.connect('mongodb://127.0.0.1/banco').then(() => {
            console.log('Conectado com sucesso')
        }).catch((err => {
            console.log('O erro foi '+err)
        })) ;
    // Public
    appMod.use(expressMod.static(pathMod.join(__dirname,'/public')));

// Rotas --- COLOQUE AS ROTAS ABAIXO DA SUA CONFIGURAÇÃO

    appMod.get("/", (req, res) => {
        PostagemApp.find().lean().populate("categoria").sort({data: "desc"}).then((postagem) => {
            res.render("index",{postagem: postagem});
        })
 
    });

    appMod.get("/postagem/:n", (req, res) => {
        
        PostagemApp.findOne({slug: req.params.n}).lean().then((postagemI) => {
            res.render("./postagem/index", {postagem: postagemI})
        });
       
    });

    // o AppMod.use define o nome da rota no primeiro parametro
    // e no segundo qual o grupo de rotas a ser usado
    appMod.use('/admin',adminImport);

    appMod.use('/usuarios',usuarioImport);



// Outros

appMod.listen(PORT, () => {
    console.log("Servidor Rodando!!");
});


// -----------------------------------------------------------------------------------