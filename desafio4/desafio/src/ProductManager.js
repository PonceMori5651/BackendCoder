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
            thumbnails: [],
            code:data.code,
            stock:data.stock,
            category: data.category,
            status: true
        }
        if(!data.title || !data.description || !data.price || !data.status || !data.code || !data.stock || !data.category){
            return true
        }
        return this.getProducts()
        .then((result) => {
            newProduct.id = result.length +1
            result.push(newProduct)
            const stringArray = JSON.stringify(result,null,2)
            return fs.promises.writeFile(this.path,stringArray)
        })
        .catch(() => {
            const array = [newProduct]
            const stringArray = JSON.stringify(array,null,2)
            return fs.promises.writeFile(this.path,stringArray)
            .catch((err) => {
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
                return -1
            }
            return result[findId]
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
            result[findId].title = obj.title || result[findId].title
            result[findId].description = obj.description || result[findId].description
            result[findId].price = obj.price || result[findId].price
            result[findId].thumbnails = obj.thumbnails || result[findId].thumbnails
            result[findId].code = obj.code || result[findId].code
            result[findId].stock = obj.stock || result[findId].stock
            result[findId].status = obj.status || result[findId].status
            result[findId].category = obj.category || result[findId].category
            const stringArray = JSON.stringify(result,null,2)
            return fs.promises.writeFile(this.path,stringArray),result[findId]
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
                return -1
            }
            result.splice(findId,1)
            const stringArray = JSON.stringify(result,null,2)
            return fs.promises.writeFile(this.path,stringArray)
        })
        .catch((err) => {
            console.error(err)
            throw err
        });
    }
}

module.exports = ProductManager