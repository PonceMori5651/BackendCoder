const express = require('express')
const userRouter = require('./routers/userRouter') 
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use('/', userRouter)

app.listen(8080,()=>{
    console.log("Servidor Express Escuchando en el puerto 8080")
})