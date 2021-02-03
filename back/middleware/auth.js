require("dotenv").config;
const jwt = require("jsonwebtoken");
const {SECRET} = process.env;

function userAuthorized(req, res, next) {
    try {
        //DESESTRUCTURACIÓN DE REQ.HEADERS
        const { authorization } = req.headers;

        if(!authorization) {
            res.redirect("http://localhost:8000/login");
        } else{

            //DESCODIFIICAMOS EL TOKEN
            const decoded = jwt.verify(authorization, SECRET);
            next();
        }
       
    } catch(error){
        next(error)
    }
}

module.exports = userAuthorized;