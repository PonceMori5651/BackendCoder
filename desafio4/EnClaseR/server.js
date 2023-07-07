const express = require('express')
const petRouter = require('./routers/petRouter') 
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static',express.static('public'))


app.use('/api/pets', petRouter)

app.listen(8080,()=>{
    console.log("Servidor Express Escuchando en el puerto 8080")
})