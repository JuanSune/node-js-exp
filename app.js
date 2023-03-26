const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1/test').then(() => {
    console.log("Conectado ao MongoDB")
}).catch((err) => {
    console.log("Houve o seguinte erro"+err)
})

const UsuarioSchema = mongoose.Schema({
    nome:{
        type:String,
        require:true
    },
    sobrenome:{
        type:String,
        require:true
    }
})

mongoose.model('usuarios', UsuarioSchema)

const Victor = mongoose.model('usuarios')

new Victor({
    nome:'Juanzito',
    sobrenome:'Yami'
}).save().then(() => {
    console.log("Foi cadastrado o usuario")
}).catch((err) => {
    console.log("Deu o seguinte erro: "+err)
})