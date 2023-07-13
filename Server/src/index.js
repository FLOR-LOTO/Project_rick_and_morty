const http = require("http");
const characters = require('./utils/data.js');

const PORT = 3001;
http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
// en nuestra app tenemos dos rutas =    /character/:id     /characters/:id
const urlSplit = req.url.split("/")  // Aca separo por las barras
const pos1 = urlSplit[1]  // rickandmorty
const pos2 = urlSplit[2]  //character o characters
const id = urlSplit[3]    // id
if (pos1 === "rickandmorty" && pos2 === "characters") { // esto es porque tenemos una ruta con todos los characters y otra con cada personaje (character)
    res.writeHead(200, {"Content-type":"application/json"})
    return res.end(JSON.stringify(characters));
}
if (pos1 === "rickandmorty" && pos2 === "character") {  //esta es la ruta del ID character/:id 
    const character = characters.find((charact) => {
        return charact.id === Number(id);
    })
    if (character){
    res.writeHead(200, {"Content-type":"application/json"})
    return res.end(JSON.stringify(character));
    }
    return res.writeHead(404, {"Content-type":"text/plain"}).end("Not Found!");
}
}).listen (PORT, "localhost");   






// console.log(req)
// res.setHeader('Access-Control-Allow-Origin', '*');
// const {url} = req;

// if (url === "/") {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.end("Welcome to the Rick and Morty API")}

// else if(url.includes("/rickandmorty/character")){
//     const idCharacter = url.split('/').pop(); // dividimos en las barras con .split y .pop elimina y devuelve el ultimo elemento, esto se guarda.
//     const character = characters.find(char => char.id === Number(idCharacter));

//     res.writeHead(200, { "Content-Type":"application/json" })
//     return res.end (JSON.stringify(character))
// } 
//     res.writeHead(404);
//     res.end('Error');