const { request, response, json} = require('express');
const Producto = require('../models/producto');

const getProductos = async(req = request, res = response) => {
    const query = {estado: true};

    const listaProductos = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query).populate('usuario', 'correo').populate('categoria', 'nombre')
    ]);

    res.json({
        msg: 'Get Producto',
        listaProductos
    });
}

const getProductoPorId = async(req = request, res = response) => {
    const {id} = req.params;

    const productoById = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

    res.status(201).json(productoById);
}

const postProducto = async(req = request, res = response) => {
    const {estado, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre: body.nombre});

    if (!productoDB) {
        return res.status(400).json({
            msg: `producto ${productoDB.nombre}, ya ha sido creado`
        });
    }

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = await Producto(data);

    await producto.save();

    res.status(201).json(producto);
}

const putProducto = async(req = request, res = response) => {
    const {id} = req.params;
    const {estado, usuario, ...restoData} = req.body;

    if (restoData.nombre) {
        restoData.nombre = restoData.nombre.toUpperCase();
        restoData.usuario = req.usuario._id;
    }

    const productoEditado = await Producto.findByIdAndUpdate(id, restoData, {new: true});

    res.status(201).json({
        msg: 'Put Producto',
        productoEditado
    })
}

const deleteProducto = async(req = request, res = response) => {
    const {id} = req.params;

    const productoEliminado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.status(201).json({
        msg: 'DELETE',
        productoEliminado
    });
}

module.exports = {
    getProductos,
    getProductoPorId,
    postProducto,
    putProducto,
    deleteProducto
}