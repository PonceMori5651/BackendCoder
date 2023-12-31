const express = require('express')
const productRouter = require('./routers/productRouter')
const cartRouter = require('./routers/cartRouter')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use('/public',express.static('public'))

app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)
app.listen(8080, ()=>{
    console.log("Servidor Express Escuchando en el puerto 8080")
})