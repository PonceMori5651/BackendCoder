const http = require('http')
const server = http.createServer((request, response)=>{
    if(request.url==='/contacto'){
        response.end("Bienvenidos a la pagina web2")
    }
})
server.listen(8080,()=>{
    console.log("Servidor escuchando en el puerto 8080")
})