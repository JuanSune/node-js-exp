const mongooseModule = require('mongoose');
const SchemaModule= mongooseModule.Schema;

const CategoriaModule = new SchemaModule({
    nome:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required: true
    },
    dateActual:{
        type: Date,
        default: Date.now()
    }

});

mongooseModule.model("categorias", CategoriaModule);