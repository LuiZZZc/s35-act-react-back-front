const mongoose = require('mongoose');
const getConnection = async () => {
    try {

        const url = "mongodb+srv://lcgn2077:1234@cluster0.qqoyh.mongodb.net/"

        await mongoose.connect(url)

        console.log("conexion exitosa")
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getConnection
}