let url = "http://anapioficeandfire.com/api/";
const axios = require("axios");


async function filter(req, res, next) {

    try {
    //DESESTRUCTURACIÓN REQ.PARAMS

    const { category } = req.params;

    //CONSTRUCCIÓN URL
    url = url + category;

    //OBTENCIÓN FILTRO DE BÚSQUEDA

    const query = req.query;

    //BÚSQUEDA POR CATEGORÍA

    let data =(await axios(url)).data;

    if(Object.keys(query)){
    for(const key in query) {
        data = data.filter((entry) => entry[key] === query[key]);
    }
}
    url = "http://anapioficeandfire.com/api/"

    //emitimos respuesta
    res.send(data);

    } catch(error) {
        next(error)
    }
}

module.exports = filter;