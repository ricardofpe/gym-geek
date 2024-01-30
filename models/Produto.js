
const mongoose = require('mongoose')

const Produto = mongoose.model('Produto',{
    img: String,
    nome: String,
    preco: Number
})

module.exports = Produto