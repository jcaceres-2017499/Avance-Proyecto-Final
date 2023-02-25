const mongoose = require('mongoose');

const dbConection = async() => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(process.env.MONGODB_TO);
        console.log('Base de datos ha sido conectada');
    } catch (error) {
        console.log(error);
        throw new Error('Error de conexión en la Base de datos');
    }
}

module.exports = {
    dbConection
}