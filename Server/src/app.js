const express = require("express");
const server = express();

const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");

server.use(cors())

server.use(morgan("dev")) // si no especifico la ruta se lo asigna a todas

server.use((req, res, next) => {  //configuracion del CORS
    res.header('Access-Control-Allow-Origin', '*'); //acceso a todos (api publica)
    res.header('Access-Control-Allow-Credentials', 'true'); // envio de cookies y credenciales
    res.header(
        'Access-Control-Allow-Headers', //permite a los dos anteriores
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
        'Access-Control-Allow-Methods',  //permite los metodos
        'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

server.use(express.json()) //nos sirve para post que utiliza el body

server.use('/rickandmorty', router)

module.exports = server;