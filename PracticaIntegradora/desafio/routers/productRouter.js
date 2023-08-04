const {Router} = require('express')
const productRouter = Router();
const uploader = require('../utils')
const ProductManager = require('../src/ProductManager')
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
        if(result === -1){
            return res.status(404).json({
                "error": "Not Found Product"
            })
        }
        res.status(200).json(result)
    }).catch((err) => {
        res.status(404).json(err)
    });
})

productRouter.post('/',uploader.single('thumbnails'),(req, res)=>{
    const obj = req.body
    console.log("nombre del archivo : "+req.file.originalname)
    obj.thumbnails = req.file.originalname
    console.log({obj})
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
        if(result===-1){
            return res.status(404).json({
                "err":"No se encontro el Id del producto a actualizar"
            })
        }
        res.status(201).json(result)
    }).catch((err) => {
        res.status(404).json(err)
    });
})

productRouter.delete('/:pId',(req, res)=>{
    const productId = parseInt(req.params.pId)
    if(!productId){
        return res.status(404).json({
            "error": "Ingrese un Id de producto valido"
        })
    }
    manager.deleteProduct(productId)
    .then((result) => {
        if(result===-1){
            return res.status(404).json({
                "error": "Not Found Product"
            })
        }
        res.status(204).json({})
    }).catch((err) => {
        res.status(404).json(err)
    });
})


module.exports = productRouter