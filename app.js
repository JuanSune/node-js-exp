const mongoose = require("mongoose")

mongoose.connect('mongodb://127.0.0.1/test').then(() => {
    console.log("Conectado ao MongoDB")
}).catch((err) => {
    console.log("Houve o seguinte erro"+err)
})

const UserSchema = mongoose.Schema({
    
})