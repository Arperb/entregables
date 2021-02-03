const fs = require("fs").promises;  
const bcrypt = require("bcrypt");


async function register(req, res, next) {
    
    try {
        //PARÁMETROS BODY
        const { name, email, password } = req.body;
        

        //SI FALTARAN DATOS EN LA INSERCIÓN
        if(!name || !email || !password) {
            throw new Error("faltan datos");
        }
        //OBTENER USUARIO DEL ARCHIVO JSON
        const users = require("../users.json");

        //COMPROBAR SI EL USUARIO YA EXISTE
        if(users.find((user) => user.email === email)){
            throw new Error("el usuario ya existe");
        }
        //ENCRIPTACIÓN CONTRASEÑA
        const passwordCrypted = await bcrypt.hash(password, 10);

        //GUARDAMOS USUARIO EN VARIABLE USER
        users.push({ name, email, password: passwordCrypted});

        //AÑADIR USUARIO EN EL ARCHIVO JSON
        await fs.writeFile("./users.json", JSON.stringify(users));

        res.send(users);
    } catch(error) {
        next(error);
    }
}

module.exports = register;