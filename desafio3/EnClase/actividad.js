const express = require('express')
const app = express()
const stringHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1 style="color: blue;">Bienvenidos a la pagina de inicio</h1>
</body>
</html>`
const objUser = {
    name: "Aaron",
    lastname: "Ponce",
    age: 22,
    email: "aaron@gmail.com"
}
app.get('/bienvenida',(req, res)=>{
    res.send(stringHtml)
})

app.get('/usuario',(req, res)=>{
    res.send(objUser)
})

app.listen(8080,()=>{
    console.log("Servidor escuchando en el puerto 8080")
})