const{Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    correo: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'El password es requerido']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        
    },
    estado: {
        type: Boolean,
        default: true
    },
    goole: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Usuario', UsuarioSchema)