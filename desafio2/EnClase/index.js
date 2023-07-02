const fs = require('fs')
/*const ruta = './archivoDate'
const contenido = new Date().toLocaleString()
fs.writeFile(ruta,contenido, (err)=>{
    if(err!==null){
        console.error({err})
        return err
    }
    fs.readFile(ruta,'utf-8',(err, resultado)=>{
        if(err!==null){
            console.error({err})
            return err
        }
        console.log({resultado})  
    })
})*/
fs.promises.readFile('./package.json','utf-8')
.then((result) => {
    const info = JSON.parse(result)
    console.log({result,info})
}).catch((err) => {
    console.error(err)
});