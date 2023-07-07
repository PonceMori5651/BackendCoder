
const {Router} = require('express')
const productRouter = Router();
const ProductManager = require('../src/ProductManager');
const manager = new ProductManager('./json/Products.json')

productRouter.get('/',(req, res)=>{
    manager.getProducts()
    .then((result) => {
        const lm = parseInt(req.query.limit)
        if(lm && lm<result.length && lm >= 0){
            const productLimit = result.slice(0,lm)
            return res.status(200).json(productLimit)
        }
        res.status(200).json(result)
    }).catch((err) => {
        res.status(404).json(err)
    });
})

productRouter.get('/:pId',(req, res)=>{
    const productId = parseInt(req.params.pId)
    if(!productId){
        return res.status(404).json({
            "error": "Ingrese un Id de producto valido"
        })
    }
    manager.getProductById(productId)
    .then((result) => {
        if(result.length === 0){
            return res.status(404).json({
                "error": "Not Found Product"
            })
        }
        res.status(200).json(result)
    }).catch((err) => {
        res.status(404).json(err)
    });
})

productRouter.post('/',(req, res)=>{
    const obj = req.body
    const valor = manager.addProduct(obj)
    if(valor===true){
        return res.status(404).json({
            "err":"Llenar todos los campos obligatorios"
        })
    }
    res.status(201).json(obj)
})

productRouter.put('/:pId',(req, res)=>{
    const productId = parseInt(req.params.pId)
    if(!productId){
        return res.status(404).json({
            "error": "Ingrese un Id de producto valido"
        })
    }
    const updproduct = req.body
    manager.updateProduct(productId,updproduct)
    .then((result) => {
        res.status(201).json(result)
    }).catch((err) => {
        res.status(404).json(err)
    });
})

productRouter.delete('/:pId',(req, res)=>{
    const productId = parseInt(req.params.pId)
    const findproductIndex = products.findIndex(el =>el.id ===productId)
    if(findproductIndex===-1){
        return res.status(404).json({
            "error": "product Not Found"
        })
    }

    products.splice(findproductIndex,1)
    res.status(204).json({})
})


module.exports = productRouter