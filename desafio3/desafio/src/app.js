const express = require('express')

const ProductManager = require('./ProductManager')

const app = express()

const manager = new ProductManager('./Products.json')

app.get('/products',(req,res)=>{
    manager.getProducts()
    .then((result) => {
        const lm = parseInt(req.query.limit)
        if(lm && lm<result.length && lm >= 0){
            const productLimit = result.slice(0,lm)
            return res.send(productLimit)
        }
        res.send(result)
    }).catch((err) => {
        res.send(err)
    });
})

app.listen(8080,()=>{
    console.log("Servidor escuchando en el puerto 8080")
})

