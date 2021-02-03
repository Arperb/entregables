require("dotenv").config();
const bcrypt = require("bcrypt");
const {SECRET} = process.env;
const jwt = require("jsonwebtoken");

async function login(req, res, next) {

    try {
        //PAŔAMETROS BODY
        const {email, password} = req.body;

        //OBTENEMOS DATOS DEL JSON
        const users = require("../users.json")

        //ENCONTRAMOS USUARIO Y PASSWORD
         const user = users.find((u) => u.email === email);

        //ERROR SI NO EXISTE USUARIO EN EL JSON
       if (!user) {
           throw new Error("usuario no existe");
       }

       //COMPROBACIÓN DE LA CONTRASEÑA
       const passwordMatch = await bcrypt.compare(password, user.password);

       if(!passwordMatch) {
           throw new Error("contraseña no coincide")
       }

       //GENERACIÓN DEL TOKEN
       const token = jwt.sign(user.email, SECRET);
      

       res.send("estás logueado")

    } catch(error) {
        next(error);
    }
}

module.exports = login;