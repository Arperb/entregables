require("dotenv").config();

//IMPORTAMOS FUNCIÓN
const { getData } = require("./controllers/got");

//LIBRERIAS

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

//PUERTO DEL .ENV

const {PORT} = process.env;

//CONTROLADORES

const register = require("./controllers/register");
const login = require("./controllers/login");
const { got } = require("./controllers/got");
const filter = require("./controllers/filter");

//MIDDLEWARES

const userAuthorized = require("./middleware/auth");

//LIBRERIAS SOBRE EXPRESS-APP

app.use(morgan("dev"));
app.use(bodyParser.json());

//COMPROBACIÓN DE QUE EL SERVIDOR FUNCIONA
app.get("/", (req, res) => res.send("llega"));

//REGISTER
app.post("/register", register);

//LOGIN
app.post("/login", login);

//RUTA RESTRINGIDA
app.get("/got", userAuthorized, got);

//RUTA REDIRIGIDA DE LOGIN
app.get("/login", (req, res) => res.send("login"));

//RUTA PARA FILTRAR POR CATEGORÍA
app.get("/got/:category", filter);

//RUTA PARA GESTIONAR ERRORES
app.use((error, req, res, next) => {
    res.send(`tienes el siguiente error ${error.message}`);
});

//RUTA EN CASO DE QUE NO SE ENCUENTRE LA RUTA
app.use((req, res) => {
    res.status(404).send("Esta página no existe");
});




app.listen(PORT, () => {
    console.log(`Tenemos el puerto ${PORT} funcionando`);

});





