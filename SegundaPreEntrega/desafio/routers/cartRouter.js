const {Router} = require('express')
const cartRouter = Router()
const CartManager = require('../Dao/CartManager')
const managerC = new CartManager('./json/Carts.json')

cartRouter.post('/',(req, res)=>{
    managerC.addCart()
    .then((result) => {
        res.status(201).json(result)
    }).catch((err) => {
        res.status(404).json(err)
    });
})

cartRouter.get('/:cId',(req, res)=>{
    const cartId = parseInt(req.params.cId)
    if(!cartId){
        return res.status(404).json({
            "error": "Ingrese un Id de carrito valido"
        })
    }
    managerC.getCartById(cartId)
    .then((result) => {
        if(result === -1){
            return res.status(404).json({
                "error": "Not Found Cart"
            })
        }
        res.status(200).json(result.products)
    }).catch((err) => {
        res.status(404).json(err)
    });
})
cartRouter.post('/:cId/product/:pId',(req, res)=>{
    const cartId = parseInt(req.params.cId)
    const productId = parseInt(req.params.pId)
 
    if(!cartId || !productId){
        return res.status(404).json({
            "error": "Id de carrito o Id de producto invalido"
        })
    }
    managerC.addProductCart(cartId,productId)
    .then((result) => {
        if(result === -1){
            return res.status(404).json({
                "error": "Not Found Cart"
            })
        }
        res.status(200).json(result)
    }).catch((err) => {
        res.status(404).json(err)
    });
})


module.exports = cartRouter