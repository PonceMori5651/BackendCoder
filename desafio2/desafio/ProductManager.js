const fs = require('fs')
class ProductManager{
    constructor(path){
        this.path=path
    }
    getProducts (){
        return fs.promises.readFile(this.path,'utf-8')
        .then((result) => {
            const arrayObj = JSON.parse(result)
            return arrayObj
        }).catch(() => {
            return []
        })
    }
    addProduct (data) {
        const newProduct = {
            id: 1,
            title: data.title,
            description: data.description,
            price: data.price,
            thumbnail: data.thumbnail,
            code:data.code,
            stock:data.stock
        }
        if(!data.title || !data.description || !data.price || !data.thumbnail || !data.code || !data.stock){
            console.error("Todos los campos son requeridos")
            return
        }
        return this.getProducts()
        .then((result) => {
            const existCode = result.findIndex(el=>el.code === data.code)
            if(existCode!==-1){
                console.error("Code ya registrado anteriormente")
                return 1
            }
            newProduct.id = result.length +1
            result.push(newProduct)
            const stringArray = JSON.stringify(result,null,2)
            return fs.promises.writeFile(this.path,stringArray)
        })
        .then((rt)=>{
            if(rt===1){
                return
            }
            console.log("El producto se agrego correctamente")
            return
        })
        .catch(() => {
            const array = [newProduct]
            const stringArray = JSON.stringify(array,null,2)
            return fs.promises.writeFile(this.path,stringArray)
            .then(() => {
                console.log("Archivo creado / el producto se agrego correctamente")
                return
            }).catch((err) => {
                console.error({err})
                throw err
            });
        });

    }
    getProductById (idProduct) {
        return this.getProducts()
        .then((result) => {
            const findId = result.findIndex(el=>el.id===idProduct)
            if(findId===-1){
                console.error("No se encontro el Id especificado")
                return
            }
            console.log(result[findId])
            return
        }).catch((err) => {
            console.error(err)
            throw err
        });
    }
    updateProduct (idProduct, obj) {
        return this.getProducts()
        .then((result) => {
            const findId = result.findIndex(el=>el.id===idProduct)
            if(findId===-1){
                console.error("No se encontro el Id del producto a actualizar")
                return -1
            }
            result[findId].title = obj.title
            result[findId].description = obj.description
            result[findId].price = obj.price
            result[findId].thumbnail = obj.thumbnail
            result[findId].code = obj.code
            result[findId].stock = obj.stock
            const stringArray = JSON.stringify(result,null,2)
            return fs.promises.writeFile(this.path,stringArray)
        }).then((rt)=>{
            if(rt===-1){
                return
            }
            console.log("Se actualizo correctamente el producto")
            return
        })
        .catch((err) => {
            console.error(err)
            throw err
        });
    }
    deleteProduct (idProduct){
        return this.getProducts()
        .then((result) => {
            const findId = result.findIndex(el=>el.id===idProduct)
            if(findId===-1){
                console.error("No se encontro el Id del producto a eliminar")
                return -1
            }
            result.splice(findId,1)
            const stringArray = JSON.stringify(result,null,2)
            return fs.promises.writeFile(this.path,stringArray)
        }).then((rt)=>{
            if(rt===-1){
                return
            }
            console.log("Producto eliminado correctamente")
        })
        .catch((err) => {
            console.error(err)
            throw err
        });
    }
}

const manager = new ProductManager('./Products.json')
/*manager.getProducts()
.then((result) => {
    console.log(result)
}).catch((err) => {
    console.log(err)
});*/
const product1 = {
    title: "producto prueba",
    description:"Este es un producto prueba modificado",
    price:200,
    thumbnail:"Sin imagen",
    code:"abc123",
    stock:25
}
const product2 = {
    title: "producto prueba2",
    description:"Este es un producto prueba2",
    price:499,
    thumbnail:"Sin imagen",
    code:"abc1234"
}
manager.addProduct(product2)