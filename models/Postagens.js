const mongooseModule = require('mongoose');
const SchemaModule= mongooseModule.Schema;

const PostagemModule = new SchemaModule({
    titulo:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    descricao:{
        type: String,
        required: true
    },
    conteudo:{
        type: String,
        required: true
    },
    categoria:{
        type:  SchemaModule.Types.ObjectId,
        ref:"categorias",
        required: true
    },
    data:{
        type:Date,
        default:Date.now()
    }
})

mongooseModule.model("postagens", PostagemModule);