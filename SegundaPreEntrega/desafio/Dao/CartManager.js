const fs = require('fs')
class CartManager{
    constructor(path){
        this.path=path
    }
    getCarts (){
        return fs.promises.readFile(this.path,'utf-8')
        .then((result) => {
            const arrayObj = JSON.parse(result)
            return arrayObj
        }).catch(() => {
            return []
        })
    }
    addCart(){
        const newCart = {
            id:1,
            products:[]
        }
        return this.getCarts()
        .then((result) => {
            newCart.id = result.length +1
            result.push(newCart)
            const stringArray = JSON.stringify(result,null,2)
            return fs.promises.writeFile(this.path,stringArray),newCart
        }).catch(() => {
            const array = [newCart]
            const stringArray = JSON.stringify(array,null,2)
            return fs.promises.writeFile(this.path,stringArray), newCart
            .catch((err) => {
                console.error({err})
                throw err
            });
        });

    }
    getCartById(idCart){
        return this.getCarts()
        .then((result) => {
            const findId = result.findIndex(el=>el.id===idCart)
            if(findId===-1){
                return -1
            }
            return result[findId]
        }).catch((err) => {
            console.error(err)
            throw err
        });
    }

    addProductCart (idCart,idProduct){
        const objProduct = {
            id: idProduct,
            quantity:1
        }
        return this.getCarts()

        .then((result) => {
            const findIdCart = result.findIndex(el=>el.id===idCart)
            
            if(findIdCart===-1 ){
                return -1
            }

            const findIdProduct = result[findIdCart].products.findIndex(el=>el.id===idProduct)
            if(findIdProduct===-1){
                result[findIdCart].products.push(objProduct)
                const stringArray = JSON.stringify(result,null,2)
                return fs.promises.writeFile(this.path,stringArray)
                .then(()=>{
                    return result[findIdCart].products[findIdProduct]
                })
                .catch((err) => {
                    throw err
                });
            }
            result[findIdCart].products[findIdProduct].quantity = result[findIdCart].products[findIdProduct].quantity +1
            const stringArray = JSON.stringify(result,null,2)
            return fs.promises.writeFile(this.path,stringArray)//,result[findIdCart].products
            .then(()=>{
                return result[findIdCart].products[findIdProduct]
            })
            .catch((err) => {
                throw err
            });
            
        }).catch((err) => {
            console.error(err)
            throw err
        });
    }

}


module.exports = CartManager