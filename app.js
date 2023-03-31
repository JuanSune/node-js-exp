// Carregando Modulos

const expressMod = require('express');

const handlebarsMod = require('express-handlebars');

const appMod = expressMod();

const PORT = 8081;

const adminImport = require('./rotas/admin');

const pathMod = require('path');


 const mongooseModule = require("mongoose");

// Configuraçoes

    // Body Parser
    appMod.use(expressMod.urlencoded({extended: true}));
    appMod.use(expressMod.json());

    // Handlebars
    appMod.engine('handlebars', handlebarsMod.engine({defaultLayout: 'main'}))
    appMod.set('view engine','handlebars');
    // Mongoose
        // Em breve
        mongooseModule.connect('mongodb://127.0.0.1/banco').then(() => {
            console.log('Conectado com sucesso')
        }).catch((err => {
            console.log('O erro foi '+err)
        })) ;
    // Public
    appMod.use(expressMod.static(pathMod.join(__dirname,'/public')));

// Rotas --- COLOQUE AS ROTAS ABAIXO DA SUA CONFIGURAÇÃO

    appMod.use('/admin',adminImport);



// Outros

appMod.listen(PORT, () => {
    console.log("Servidor Rodando!!");
});


// -----------------------------------------------------------------------------------
// mongoose.connect('mongodb://127.0.0.1/TodosUsuarios').then(() => {
//     console.log("Conectado ao MongoDB")
// }).catch((err) => {
//     console.log("Houve o seguinte erro"+err)
// })

// const UsuarioSchema = mongoose.Schema({
//     nome:{
//         type:String,
//         require:true
//     },
//     sobrenome:{
//         type:String,
//         require:true
//     }
// })

// mongoose.model('usuarios', UsuarioSchema)

// const Victor = mongoose.model('usuarios')

// new Victor({
//     nome:'Juanzito',
//     sobrenome:'Yami'
// }).save().then(() => {
//     console.log("Foi cadastrado o usuario")
// }).catch((err) => {
//     console.log("Deu o seguinte erro: "+err)
// })