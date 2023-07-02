class ProductManager{
    constructor(){
        this.products = []
    }
    getProducts(){
        return this.products
    }
    addProduct(data){
        const newProduct = {
            id: this.products.length+1,
            title: data.title,
            description: data.description,
            price:data.price,
            thumbnail: data.thumbnail,
            code: data.code,
            stock: data.stock
        }
        if(!data.title || !data.description || !data.price || !data.thumbnail ||
            !data.code || !data.stock){
                console.error("ERROR: Todos los campos son obligatorios.")
                return
            }
        const existCode = this.products.findIndex(el=>el.code===data.code)
        if(existCode!==-1){
            console.error("ERROR: El code ingresado ya existe")
            return
        }
        this.products.push(newProduct)
    }
    getProductById(idProduct){
        const findID = this.products.findIndex(el=>el.id===idProduct)
        if(findID===-1){
            console.error("ERROR: Not Found")
            return
        }
        console.log(this.products[findID])
    }
}

const manager = new ProductManager()
//console.log(manager.getProducts())
const product1 = {
    title: "producto prueba",
    description:"Este es un producto prueba",
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
    code:"abc1233",
    stock:25
}
manager.addProduct(product1)
manager.addProduct(product2)
manager.getProductById(1)
//cconsole.log(manager.getProducts())
