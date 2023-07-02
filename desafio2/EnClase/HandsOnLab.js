const fs = require('fs')
class ManagerUsuarios{
    constructor(){
        this.ruta='./Usuario.json'
    }
    consultUser(){
        return fs.promises.readFile(this.ruta,'utf-8')
        .then((result) => {
            const arrayObj = JSON.parse(result)
            return arrayObj
        }).catch((err) => {
            throw err
        });
    }
    createUser(data){
        const newUser={
            name: data.name,
            lastname: data.lastname,
            age: data.age,
            course: data.course
        }
        return this.consultUser()
        .then((result) => {
            result.push(newUser)
            const stringArray = JSON.stringify(result,null,2)
            console.log("Se agrego el usuario con exito")
            return fs.promises.writeFile(this.ruta,stringArray)
        }).catch(() => {
            const array = [newUser]
            const stringArray = JSON.stringify(array,null,2)
            return fs.promises.writeFile(this.ruta,stringArray)
            .then(() => {
                console.log("Se creo el archivo y agrego el usuario con exito")
            }).catch((err) => {
                console.error("Error al escribir en el archivo",err)
                throw err;
            });
        });

    }
}

const manager = new ManagerUsuarios()

const user1 ={
    name: "Aaron",
    lastname: "Ponce",
    age: 22,
    course: "Backend"
}

manager.createUser(user1)