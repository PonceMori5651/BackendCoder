const {Router} = require('express')
const cartRouter = Router()
const carts = [
    {
        id:1,
        products: [1,3,4]
    }
]
cartRouter.get('/',(req, res)=>{
    const lm = parseInt(req.query.limit)
        if(lm && lm<carts.length && lm >= 0){
            const cartLimit = carts.slice(0,lm)
            return res.status(200).json(cartLimit)
        }
    res.status(200).json(carts)
})

cartRouter.get('/:cId',(req, res)=>{
    const cartId = parseInt(req.params.cId)
    const findcartIndex = carts.findIndex(el =>el.id ===cartId)
    if(findcartIndex===-1){
        return res.status(404).json({
            "error": "cart Not Found"
        })
    }
    res.status(200).json(carts[findcartIndex].products)
}) //listo

cartRouter.post('/',(req, res)=>{
    req.body.id = carts.length+1
    const newcart = req.body
    carts.push(newcart)
    res.status(201).json(newcart)
})      //listo

cartRouter.post('/:cId/product/:pId',(req, res)=>{
    req.body.id = carts.length+1
    const newcart = req.body
    carts.push(newcart)
    res.status(201).json(newcart)
}) 

cartRouter.put('/:cId',(req, res)=>{
    const cartId = parseInt(req.params.cId)
    const findcartIndex = carts.findIndex(el =>el.id ===cartId)
    if(findcartIndex===-1){
        return res.status(404).json({
            "error": "cart Not Found"
        })
    }
    const updcart = req.body

    carts[findcartIndex].title = updcart.title || carts[findcartIndex].title
    carts[findcartIndex].description = updcart.description || carts[findcartIndex].description
    carts[findcartIndex].code = updcart.code || carts[findcartIndex].code
    carts[findcartIndex].price = updcart.price || carts[findcartIndex].price
    carts[findcartIndex].status = updcart.status || carts[findcartIndex].status
    carts[findcartIndex].stock = updcart.stock || carts[findcartIndex].stock
    carts[findcartIndex].category = updcart.category || carts[findcartIndex].category
    res.status(201).json(updcart)
})

cartRouter.delete('/:cId',(req, res)=>{
    const cartId = parseInt(req.params.cId)
    const findcartIndex = carts.findIndex(el =>el.id ===cartId)
    if(findcartIndex===-1){
        return res.status(404).json({
            "error": "cart Not Found"
        })
    }

    carts.splice(findcartIndex,1)
    res.status(204).json({})
})


module.exports = cartRouter