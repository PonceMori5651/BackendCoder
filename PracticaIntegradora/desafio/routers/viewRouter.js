const {Router} = require('express')


const viewRouterFn = (io)=>{
    const viewRouter = Router()
    const uploader = require('../utils')
    const ProductManager = require('../src/ProductManager')
    const manager = new ProductManager('./json/Products.json')

    viewRouter.get('/products',(req, res)=>{
        const params = {
            titleP: 'ViewRouter',
            nombre: 'AARON'
        }
        res.render('productForm',params)
    })

    viewRouter.get('/home',(req, res)=>{
        manager.getProducts()
        .then((result) => {
            const params = {products:result}
            return res.render('home',params)
        }).catch((err) => {
            res.render('error',err)
        });
    })

    viewRouter.get('/realtimeproducts',(req, res)=>{
        manager.getProducts()
        .then((result) => {
            const params = {products:result}
            return res.render('realtimeproducts',params)
        }).catch((err) => {
            res.render('error',err)
        });
    })

    viewRouter.post('/realtimeproducts',uploader.single('thumbnails'),(req, res)=>{
        const obj = req.body
        console.log("nombre del archivo : "+req.file.originalname)
        obj.thumbnails = req.file.originalname
        console.log({obj})
        const valor = manager.addProduct(obj)
        if(valor===true){
            params = {
                err: 'Llenar todos los campos obligatorios'
            }
            return res.render('error',params)
        }
        io.emit('newProduct',JSON.stringify(obj))
        res.status(201).json(obj)
    })
    return viewRouter
}


module.exports = viewRouterFn