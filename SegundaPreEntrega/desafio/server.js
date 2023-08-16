const express = require('express')
const handlebars = require('express-handlebars')
const mongoose = require('mongoose')
const productRouter = require('./routers/productRouter')
const cartRouter = require('./routers/cartRouter')
const viewRouterFn = require('./routers/viewRouter')
const socketServer = require('./io')


const app = express()

const MONGODB_CONNECT = 'mongodb+srv://aaronponce6391:rmu6COeRxhHXDhyt@cluster0.0nehlag.mongodb.net/ecommerce?retryWrites=true&w=majority'
mongoose.connect(MONGODB_CONNECT)
.then(()=>console.log('conexion DB'))
.catch((error) => console.log(error))


const port = 8080
const httpServer = app.listen(port, ()=>{
    console.log(`Servidor Express Escuchando en el puerto ${port}`)
})

const io = socketServer(httpServer)

io.on('connection',socket=>{
    console.log('Nuevo cliente Conectado',socket.id)
})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.engine('handlebars',handlebars.engine())
app.set('views','./views')
app.set('view engine','handlebars')

app.use('/public',express.static('public'))

app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)
app.use('/',viewRouterFn(io))

