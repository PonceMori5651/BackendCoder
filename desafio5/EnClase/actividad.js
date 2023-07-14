const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const objFrase = {
    frase: "frase Inicial"
}
app.get('/api/frase',(req, res)=>{
    res.status(200).json(objFrase)
})

app.get('/api/palabras/:pos',(req, res)=>{
    const pos = parseInt(req.params.pos)
    
    const qtyPalabras = objFrase.frase.split(" ").length
    if(!pos || pos>qtyPalabras || pos <= 0 || objFrase.frase === ""){
         return res.status(404).json({
            "error": "Not Found"
        })
    }
    res.status(200).json({
        "buscada": objFrase.frase.split(" ")[pos-1]
    })
})

app.post('/api/palabras',(req, res)=>{
    const palabra = req.body.palabra
    let newPalabra
    if(objFrase.frase!==""){
        newPalabra = objFrase.frase+" "+palabra
    }else {
        newPalabra = objFrase.frase+palabra
    }
    
    objFrase.frase = newPalabra

    res.status(201).json({
        "agregada":palabra,
        "pos": objFrase.frase.split(" ").length
    }) 
})

app.put('/api/palabras/:pos',(req, res)=>{
    const pos = parseInt(req.params.pos)
    const qtyPalabras = objFrase.frase.split(" ").length

    if(!pos || pos>qtyPalabras || pos <= 0){
        return res.status(404).json({
           "error": "Not Found"
       })
   }
    const palabra = req.body.palabra
    const arrayPal = objFrase.frase.split(" ")
    const palabraAnt = arrayPal[pos-1]
    arrayPal[pos-1] = palabra
    const newFrase = arrayPal.toString().replaceAll(","," ")
    objFrase.frase = newFrase
    res.status(201).json({
        "actualizada": palabra,
        "anterior": palabraAnt
    })
})

app.delete('/api/palabras/:pos',(req, res)=>{
    const pos = parseInt(req.params.pos)
    const qtyPalabras = objFrase.frase.split(" ").length

    if(!pos || pos>qtyPalabras || pos <= 0){
        return res.status(404).json({
           "error": "Not Found"
       })
   }
    const arrayPal = objFrase.frase.split(" ")
    arrayPal.splice(pos-1,1)
    const newPalabra = arrayPal.toString().replaceAll(","," ")
    objFrase.frase = newPalabra
    res.status(204).json({})
})

app.listen(8080,()=>{
    console.log("Servidor Express Escuchando en el puerto 8080")
})
