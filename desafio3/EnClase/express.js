const express = require('express')
const app = express()

app.get('/saludo',(req,res)=>{
    res.send("¡Hola a todos, pero ahora desde express!")
})

app.listen(8080,()=>{
    console.log("El servidor esta escuchando en el puerto 8080")
})